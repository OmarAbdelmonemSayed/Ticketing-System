import { Request, Response } from 'express';
import asyncWrapper from './../../utils/asyncWrapper';
import { getPayload } from './../../utils/createTokens';
import { createTicketSchema } from './dto/createTicket.dto';
import { assignTicketToAgent, createNewTicket, deleteTicketById, getAllTickets, getTicketById, updateTicketById } from './ticket.service';
import { AuthRequest } from './../../utils/authReqest';
import { updateTicketSchema } from './dto/updateTicket.dto';
import { updateStatusSchema } from './dto/updateStatus.dto';
import { updateStatusById } from './ticket.service';
import { assignTicketSchema } from './dto/assignTicket.dto';



const createTicket = asyncWrapper(
    async (req: Request, res: Response) => {
        createTicketSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const ticket = await createNewTicket(req.body, payload.id);
        res.status(201).json({
            success: true,
            data: {
                ticket
            },
            message: "Ticket created successfully"
        });
    })



const getTickets = asyncWrapper(
    async (req: AuthRequest, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const tickets = await getAllTickets(payload);
        res.json({
            success: true,
            data: {
                tickets
            },
            message: "Tickets fetched successfully"
        });
    })



const getTicket = asyncWrapper(
    async (req: Request, res: Response) => {
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const ticket = await getTicketById(payload, req.params.id);
        res.json({
            success: true,
            data: {
                ticket
            },
            message: "Ticket fetched successfully"
        });
    })


const updateTicket = asyncWrapper(
    async (req: Request, res: Response) => {
        updateTicketSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const ticket = await updateTicketById(payload, req.params.id, req.body);
        res.json({
            success: true,
            data: {
                ticket
            },
            message: "Ticket updated successfully"
        });
    })



const deleteTicket = asyncWrapper(
    async (req: Request, res: Response) => {
        await deleteTicketById(req.params.id);
        res.json({
            success: true,
            data: null,
            message: "Ticket deleted successfully"
        });
    })



const updateStatus = asyncWrapper(
    async (req: Request, res: Response) => {
        updateStatusSchema.parse(req.body);
        const payload = await getPayload(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET as string);
        const ticket = await updateStatusById(payload, req.body, req.params.id);
        res.json({
            success: true,
            data: {
                ticket
            },
            message: "Ticket's status updated successfully"
        });
    })



const assignTicket = asyncWrapper(
    async (req: Request, res: Response) => {
        assignTicketSchema.parse(req.body);
        const ticket = await assignTicketToAgent(req.body.agentId, req.params.id);
        res.json({
            success: true,
            data: {
                ticket
            },
            message: "Ticket's agentId updated successfully"
        });
    })


const getAnalytics = asyncWrapper(
    async (req: Request, res: Response) => {

    })


const getSummary = asyncWrapper(
    async (req: Request, res: Response) => {

    })


export {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket,
    updateStatus,
    assignTicket,
    getAnalytics,
    getSummary
}