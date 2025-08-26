import express from "express";
import { hasPermission, isAuthenticated } from "./../../middlewares/auth.middleware";
import { assignTicket, createTicket, deleteTicket, getAnalytics, getSummary, getTicket, getTickets, updateStatus, updateTicket } from "./ticket.controller";
import { createComment, deleteComment, getComments, updateComment } from "./../comment/comment.controller";
import { createAttachment, deleteAttachment, getAttachments, updateAttachment } from "./../attachment/attachment.controller";
import { createNote, deleteNote, getNotes, updateNote } from "./../note/note.controller";

const router = express.Router();


router.route('/')
    .post(isAuthenticated, hasPermission('CUSTOMER'), createTicket)  
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getTickets);  



router.route('/:id')
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getTicket)  
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'ADMIN'), updateTicket)  
    .delete(isAuthenticated, hasPermission('ADMIN'), deleteTicket);  



router.route('/:id/status')
    .patch(isAuthenticated, hasPermission('AGENT', 'ADMIN'), updateStatus);  



router.route('/:id/comments')
    .post(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), createComment)  
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getComments);  



router.route('/:id/attachments')
    .post(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), createAttachment)  
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getAttachments);  



router.route('/:id/assign')
    .patch(isAuthenticated, hasPermission('ADMIN'), assignTicket);  



router.route('/:id/analytics')
    .get(isAuthenticated, hasPermission('ADMIN'), getAnalytics);



router.route('/:id/summary')
    .get(isAuthenticated, hasPermission('AGENT', 'ADMIN'), getSummary);



router.route('/:id/notes')
    .post(isAuthenticated, hasPermission('AGENT', 'ADMIN'), createNote)  
    .get(isAuthenticated, hasPermission('AGENT', 'ADMIN'), getNotes);  


    
router.route('/:id/comments/:commentId')
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), updateComment)  
    .delete(isAuthenticated, hasPermission('AGENT', 'ADMIN'), deleteComment);  



router.route('/:id/attachments/:attachmentId')
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), updateAttachment)
    .delete(isAuthenticated, hasPermission('AGENT', 'ADMIN'), deleteAttachment);  



router.route('/:id/notes/:noteId')
    .patch(isAuthenticated, hasPermission('AGENT', 'ADMIN'), updateNote)  
    .delete(isAuthenticated, hasPermission('AGENT', 'ADMIN'), deleteNote);  



export {
    router
};