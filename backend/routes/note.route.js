import express from "express";
import { createNote, getNotes } from "../controllers/note.controllers.js";
import { updateNote } from "../controllers/note.controllers.js";
import { deleteNote } from "../controllers/note.controllers.js";

const router = express.Router()

router.post('/create-note', createNote)
router.get('/get-notes', getNotes)
router.put('/update-note/:id', updateNote)
router.delete('/delete-note/:id', deleteNote)

export default router