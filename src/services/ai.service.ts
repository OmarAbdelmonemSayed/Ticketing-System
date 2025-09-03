import OpenAI from 'openai';
import { assignTicketToAgent, updateTicketById } from '../modules/ticket/ticket.service';
import { getAllUsersInDepartment } from '../modules/department/department.service';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendPrompt = async (user: any, ticket: any, subject: string, input: string) => {
    const result = await client.responses.create({
        model: process.env.OPENAI_MODEL,
        input
    });
    console.log('LLM result', result.output_text);
    if (subject === 'priority') {
        await updateTicketById(user, ticket.id, {priority: result.output_text});
    } else if (subject === 'category') {
        await updateTicketById(user, ticket.id, {category: result.output_text});
    } else if (subject === 'assign') {
        if (result.output_text != null) {            
            const users = await getAllUsersInDepartment(result.output_text);
            const usersSorted = users?.User.map((user) => {
                return {id: user.id, numberOfAssignedTickets: user.assignedTickets.length}
            });
            usersSorted?.sort((a, b) => a.numberOfAssignedTickets - b.numberOfAssignedTickets);
            if (usersSorted?.length) {
                await assignTicketToAgent(usersSorted[0].id, ticket.id);
            }
        }
    }
}

export {
    sendPrompt
}