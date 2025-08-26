import express from "express";
import { hasPermission, isAuthenticated } from "../../../middlewares/auth.middleware";
import { assignTicket, createTicket, deleteTicket, getAnalytics, getSummary, getTicket, getTickets, updateStatus, updateTicket } from "./ticket.controller";
import { createComment, deleteComment, getComments, updateComment } from "../comment/comment.controller";
import { createAttachment, deleteAttachment, getAttachments } from "../attachment/attachment.controller";
import { createNote, deleteNote, getNotes, updateNote } from "../note/note.controller";

const router = express.Router();


router.route('/')
    .post(isAuthenticated, hasPermission('CUSTOMER'), createTicket) // done
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getTickets); // done



router.route('/:id')
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getTicket) // done
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'ADMIN'), updateTicket) // done
    .delete(isAuthenticated, hasPermission('ADMIN'), deleteTicket); // done



router.route('/:id/status')
    .patch(isAuthenticated, hasPermission('AGENT', 'ADMIN'), updateStatus); // done



router.route('/:id/comments')
    .post(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), createComment) // done
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getComments); // done



router.route('/:id/attachments')
    .post(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), createAttachment) // done
    .get(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), getAttachments); // done



router.route('/:id/assign')
    .patch(isAuthenticated, hasPermission('ADMIN'), assignTicket); // done



router.route('/:id/analytics')
    .get(isAuthenticated, hasPermission('ADMIN'), getAnalytics);



router.route('/:id/summary')
    .get(isAuthenticated, hasPermission('AGENT', 'ADMIN'), getSummary);



router.route('/:id/notes')
    .post(isAuthenticated, hasPermission('AGENT', 'ADMIN'), createNote) // done
    .get(isAuthenticated, hasPermission('AGENT', 'ADMIN'), getNotes); // done


    
router.route('/:id/comments/:commentId')
    .patch(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), updateComment) // done
    .delete(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), deleteComment); // done



router.route('/:id/attachments/:attachmentId')
    .delete(isAuthenticated, hasPermission('CUSTOMER', 'AGENT', 'ADMIN'), deleteAttachment); // done



router.route('/:id/notes/:noteId')
    .patch(isAuthenticated, hasPermission('AGENT', 'ADMIN'), updateNote) // done
    .delete(isAuthenticated, hasPermission('AGENT', 'ADMIN'), deleteNote); // done



export {
    router
};