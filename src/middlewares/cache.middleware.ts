import asyncWrapper from '../utils/asyncWrapper';
import { Request, Response, NextFunction } from 'express';
import { getPayload } from '../utils/createTokens';
import { getCachedTicketById, getCachedTickets, invalidateTicketById, invalidateTickets } from '../services/cache.service';
import { getTicketById } from '../modules/ticket/ticket.service';



const cachedTickets = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;
        const payload = await getPayload(authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const tickets = await getCachedTickets(payload);
        if (!tickets) {
            next();
        }
        else {
            res.json({
                success: true,
                data: {
                    tickets
                },
                message: "Tickets fetched successfully"
            });
        }
    }
)

const invalidateTicketsOnCreateTicket = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;
        const payload = await getPayload(authorization, process.env.ACCESS_TOKEN_SECRET as string);
        await invalidateTickets(payload);
        await invalidateTickets({role: 'ADMIN'});
        next();
    }
)

const invalidateTicketsOnChangeTicket = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const ticket = await getTicketById({role: 'ADMIN'}, req.params.id);
        await invalidateTickets({role: 'CUSTOMER', id: ticket.customerId});
        await invalidateTickets({role: 'AGENT', id: ticket.agentId});
        await invalidateTickets({role: 'ADMIN'});
        next();
    }
)

const invalidateTicketsOnAssignAgentToTicket = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const ticket = await getTicketById({role: 'ADMIN'}, req.params.id);
        await invalidateTickets({role: 'AGENT', id: ticket.agentId});
        next();
    }
)

const cachedTicketById = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const ticket = await getCachedTicketById(req.params.id);
        if (!ticket) {
            next();
        }
        else {
            res.json({
                success: true,
                data: {
                    ticket
                },
                message: "Ticket fetched successfully"
            });
        }
    }
)

const invalidateTicketByIdOnChange = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        await invalidateTicketById(req.params.id);
        next();
    }
)

export {
    cachedTickets,
    invalidateTicketsOnCreateTicket,
    invalidateTicketsOnChangeTicket,
    invalidateTicketsOnAssignAgentToTicket,
    cachedTicketById,
    invalidateTicketByIdOnChange
}