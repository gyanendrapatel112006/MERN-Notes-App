import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";

export const NoteContext = createContext();

export const NoteProvider = ({children}) => {

const [notes, setNotes] = useState([]);

const [loading, setLoading] = useState(true);

const getNotes = async () => {
    setLoading(true);
    try {
        const response = await BACKEND_URL.get("/get-notes");
        const notesData = Array.isArray(response.data) ? response.data : response.data.notes || [];
        setNotes(notesData);
    } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
    getNotes();
}, [])

const createNote = async (note) => {
    try {
        const res = await BACKEND_URL.post("/create-note", note);
        if (res.data && res.data._id) {
            // Add the new note to the beginning of the list
            setNotes([res.data, ...notes]);
        }
    } catch (error) {
        console.error("Error creating note:", error);
    }
}

const updateNote = async (id, note) => {
    const res = await BACKEND_URL.put(`/update-note/${id}`, note);
    setNotes(notes.map(n => n._id === id ? res.data : n));
}

const deleteNote = async (id) => {
    await BACKEND_URL.delete(`/delete-note/${id}`);
    setNotes(notes.filter(n => n._id !== id));
}

 return (
    <NoteContext.Provider value={{notes, loading, getNotes, createNote, updateNote, deleteNote}}>
        {children}
    </NoteContext.Provider>     
)
}