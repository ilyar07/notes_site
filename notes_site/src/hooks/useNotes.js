import { createNote, deleteNote, updateNote } from '../services/noteCRUD';
import { createChecklist, deleteChecklist, updateChecklist } from '../services/checklistCRUD';

// хук для всех CRUD операций с заметками
export const useNotes = (notes, setNotes, checklists, setChecklists) => {
    // метод для кнопки добавить заметку
    const addNote = (type, title, text, priority) => {
        if (type === 'text') {
            if (!title && !text) return;
            const updatedNotes = createNote(title, text, priority);
            setNotes(updatedNotes);
        } else {
            if (!title) return;
            const updatedChecklists = createChecklist(title, [], priority);
            setChecklists(updatedChecklists);
        }
    };

    // метод для кнопки удаление заметки
    const deleteNote = (id, noteType) => {
        if (noteType === 'text') {
            const updatedNotes = deleteNote(id);
            setNotes(updatedNotes);
        } else {
            const updatedChecklists = deleteChecklist(id);
            setChecklists(updatedChecklists);
        }
    };

    //метод для кнопки закрепить заметку
    const togglePin = (id, noteType) => {
        if (noteType === 'text') {
            const updatedNotes = notes.map(note => note.id === id ? { ...note, pinned: !note.pinned } : note);
            setNotes(updatedNotes);
        } else {
            const updatedChecklist = checklists.map(checklist => checklist.id === id ? {
                ...checklist,
                pinned: !checklist.pinned
            } : checklist)
            setChecklists(updatedChecklist);
        }
    };

    // метод для замены цвета
    const changeColor = (id, type, color) => {
        if (type === 'text') {
            const updatedNotes = notes.map(note => note.id === id ?
                { ...note, color: color } :
                note
            );
            setNotes(updatedNotes);
        } else {
            const updatedChecklists = checklists.map(c => c.id === id ?
                { ...c, color: color } :
                c
            );
            setChecklists(updatedChecklists);
        }
    };

    // метод для смены приоритета
    const changePriority = (id, type, newPriority) => {
        if (type === 'text') {
            const updatedNotes = notes.map(note => note.id === id ? { ...note, priority: newPriority } : note);
            setNotes(updatedNotes);
        } else {
            const updatedChecklists = checklists.map(c => c.id === id ? { ...c, priority: newPriority } : c);
            setChecklists(updatedChecklists);
        }
    };

    // метод для дублирования заметки
    const duplicateNote = (id, noteType) => {
        if (noteType === 'text') {
            const originalNote = notes.find(n => n.id === id);
            if (originalNote) {
                const duplicatedNote = {
                    ...originalNote,
                    id: Date.now(),
                    title: `${originalNote.title} (копия)`,
                    createdAt: new Date().toLocaleString()
                };
                setNotes([duplicatedNote, ...notes]);
            }
        } else {
            const originalChecklist = checklists.find(c => c.id === id);
            if (originalChecklist) {
                const duplicatedChecklist = {
                    ...originalChecklist,
                    id: Date.now(),
                    title: `${originalChecklist.title} (копия)`,
                    createdAt: new Date().toLocaleString()
                };
                setChecklists([duplicatedChecklist, ...checklists]);
            }
        }
    };

    // метод для кнопки сохранить изменения заметки
    const updateNote = (editingId, type, title, text, priority) => {
        if (type === 'text') {
            if (!title && !text) return;
            const updatedNotes = updateNote(editingId, title, text, priority);
            setNotes(updatedNotes);
        } else {
            if (!title) return;
            const checklist = checklists.find(c => c.id === editingId);
            if (checklist) {
                const updatedChecklists = updateChecklist(editingId, title, priority);
                setChecklists(updatedChecklists)
            }
        }
    };

    return {
        addNote,
        deleteNote,
        togglePin,
        changeColor,
        changePriority,
        duplicateNote,
        updateNote
    };
};