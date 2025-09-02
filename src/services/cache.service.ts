import { createClient } from 'redis';

const client = createClient();

const CACHE_EXPIRE = 1800;
const CACHE_SIZE = 50;

const getCachedTickets = async (user: any) => {
    if (user.role === 'CUTOMER' || user.role === 'AGENT') {
        const tickets = await client.GET(`tickets:${user.id}`);
        return JSON.parse(tickets as string);
    }
    else {
        const tickets = await client.GET("tickets:admin");
        return JSON.parse(tickets as string);
    }
}

const cacheTickets = async (user: any, tickets: any) => {
    if (user.role === 'CUTOMER' || user.role === 'AGENT') {
        await client.SETEX(`tickets:${user.id}`, CACHE_EXPIRE, JSON.stringify(tickets));
    }
    else {
        await client.SETEX("tickets:admin", CACHE_EXPIRE, JSON.stringify(tickets));
    }
}

const invalidateTickets = async (user: any) => {
    if (user.role === 'CUTOMER' || user.role === 'AGENT') {
        await client.DEL(`tickets:${user.id}`);
    }
    else {
        await client.DEL("tickets:admin");
    }
}

const getCachedTicketById = async (ticketId: any) => {
    const ticket = await client.HGET('ticket', ticketId);
    return JSON.parse(ticket as string);
}

const cacheTicketById = async (ticket: any) => {
    const sz = await client.LLEN('tickets');
    if (sz === CACHE_SIZE) {
        const ticketId  = await client.LIndex('tickets', 49);
        await client.RPOP('tickets');
        await client.LPUSH('tickets', ticket.id);
        await client.HDEL('ticket', ticketId as string);
        await client.HSET('ticket', ticket.id, JSON.stringify(ticket));
    } else {
        await client.LPUSH('tickets', ticket.id);
        await client.HSET('ticket', ticket.id, JSON.stringify(ticket));
    }
}

const invalidateTicketById = async (ticketId: any) => {
    await client.HDEL('ticket', ticketId);
}

export {
    client,
    getCachedTickets,
    cacheTickets,
    invalidateTickets,
    getCachedTicketById,
    cacheTicketById,
    invalidateTicketById
}