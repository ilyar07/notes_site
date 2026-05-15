const STORAGE_KEY = 'notes';


// (CREATE) создание заметки
export const createNote = (title, text) => {
    const saved = getNotes();
    const newNote = {
        id: Date.now(),
        title: title,
        text: text,
        createdAt: new Date().toLocaleString()
    }

    const updatedNotes = [newNote, ...saved];
    return updatedNotes;
}

// (READ) получение всех заметок
export const getNotes = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

// (DELETE) удаление заметки
export const deleteNote = (id) => {
    const saved = getNotes();
    const updatedNotes = saved.filter((note) => note.id !== id);
    return updatedNotes;
}

