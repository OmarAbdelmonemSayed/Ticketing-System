import { archiveClosedAndInactiveTickets } from "../modules/ticket/ticket.service";

const schedule = require('node-schedule');

const archiveTicketsJob = () => { 
    schedule.scheduleJob('0 */6 * * *', async function(){
        await archiveClosedAndInactiveTickets();
    })
};

export {
    archiveTicketsJob
}