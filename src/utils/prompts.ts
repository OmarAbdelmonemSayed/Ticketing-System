import { updateTicketById } from '../modules/ticket/ticket.service';
import { addAIJob } from '../services/queue.service';

const getPriorityPrompt = async (user: any, ticket: any) => {
    await addAIJob(user, ticket, 'priority', `You are a priority classifier.
        Priorities (choose only ONE):
        - LOW
        - MEDIUM
        - HIGH
        - URGENT

        Task:
        Based on the ticket title and description, select the most appropriate priority.
        Always answer with ONLY the priority name from the list above.

        Title: "${ticket.title}"
        Description: "${ticket.description}"
        `);
};

const getCategoryPrompt = async (user: any, ticket: any) => {
    await addAIJob(user, ticket, 'category', `You are a ticket category classifier.
        Categories (choose only ONE):
        - BUG
        - FEATURE
        - BILLING
        - GENERAL
        - SUPPORT
        - ACCOUNT
        - PERFORMANCE
        - SECURITY

        Task:
        Based on the ticket title and description, select the most appropriate category.
        Always answer with ONLY the category name from the list above.

        Title: "${ticket.title}"
        Description: "${ticket.description}"
        `);
};

const getAssignPrompt = async (ticket: any, departments: any) => {
    await addAIJob({role: 'ADMIN'}, ticket, 'assign', `You are a ticket department classifier.
        Departments (choose only ONE):
        ${JSON.stringify(departments)}

        Task:
        Based on the ticket title and description, select the most appropriate department.
        If none of the departments match, respond with null.
        Always answer with ONLY the department name from the list above or null.

        Title: "${ticket.title}"
        Description: "${ticket.description}"
        `);
};


export {
    getPriorityPrompt,
    getCategoryPrompt,
    getAssignPrompt
}