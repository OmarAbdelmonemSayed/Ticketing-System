import express from "express";
import { hasPermission, isAuthenticated } from "./../../middlewares/auth.middleware";
import { assignTicket, createTicket, deleteTicket, getAnalytics, getFilteredTickets, getTicket, getTickets, updateStatus, updateTicket } from "./ticket.controller";
import { createComment, deleteComment, getComments, updateComment } from "./../comment/comment.controller";
import { createAttachment, deleteAttachment, getAttachments, updateAttachment } from "./../attachment/attachment.controller";
import { createNote, deleteNote, getNotes, updateNote } from "./../note/note.controller";
import { cachedTickets, invalidateTicketsOnAssignAgentToTicket, invalidateTicketsOnCreateTicket, invalidateTicketsOnChangeTicket, cachedTicketById, invalidateTicketByIdOnChange } from "../../middlewares/cache.middleware";
import { upload } from "../../services/file.service";

const router = express.Router();


router.route('/')
    .post(isAuthenticated, hasPermission('CUSTOMER'), invalidateTicketsOnCreateTicket, createTicket)  
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), cachedTickets, getTickets);  


router.route('/filters')
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getFilteredTickets);


router.route('/:id')
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), cachedTicketById, getTicket)  
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'ADMIN'), invalidateTicketsOnChangeTicket, updateTicket)  
    .delete(isAuthenticated, hasPermission('ADMIN'), invalidateTicketsOnChangeTicket, deleteTicket);  



router.route('/:id/status')
    .patch(isAuthenticated, hasPermission('AGENT', 'ADMIN'), invalidateTicketsOnChangeTicket, updateStatus);  



router.route('/:id/comments')
    .post(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), invalidateTicketByIdOnChange, createComment)  
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getComments);  



router.route('/:id/attachments')
    .post(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), invalidateTicketByIdOnChange, upload.single('fileUrl'), createAttachment)  
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getAttachments);  



router.route('/:id/assign')
    .patch(isAuthenticated, hasPermission('ADMIN'), invalidateTicketsOnAssignAgentToTicket, assignTicket);  



router.route('/:id/analytics')
    .get(isAuthenticated, hasPermission('ADMIN'), getAnalytics);


router.route('/:id/notes')
    .post(isAuthenticated, hasPermission('AGENT', 'ADMIN'), createNote)  
    .get(isAuthenticated, hasPermission('AGENT', 'ADMIN'), getNotes);  


    
router.route('/:id/comments/:commentId')
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), invalidateTicketByIdOnChange, updateComment)  
    .delete(isAuthenticated, hasPermission('AGENT', 'ADMIN'), invalidateTicketByIdOnChange, deleteComment);  



router.route('/:id/attachments/:attachmentId')
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), invalidateTicketByIdOnChange, upload.single('fileUrl'), updateAttachment)
    .delete(isAuthenticated, hasPermission('AGENT', 'ADMIN'), invalidateTicketByIdOnChange, deleteAttachment);  



router.route('/:id/notes/:noteId')
    .patch(isAuthenticated, hasPermission('AGENT', 'ADMIN'), updateNote)  
    .delete(isAuthenticated, hasPermission('AGENT', 'ADMIN'), deleteNote);  



export {
    router
};