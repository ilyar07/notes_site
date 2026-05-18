const STORAGE_KEY = 'notes';


// (CREATE) создание заметки
export const createNote = (title, text, priority) => {
    const saved = getNotes();
    const newNote = {
        id: Date.now(),
        type: 'text',
        title: title,
        text: text,
        pinned: false,
        color: '#ffffff',
        priority: priority || 'medium', 
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

// (UPDATE) обновление заметки
export const updateNote = (id, title, text, priority) => {
    const saved = getNotes();
    const updatedNotes = saved.map((note) => {
        return note.id === id ?
        {
            ...note,
            title: title,
            text: text,
            priority: priority,
            updatedAt: new Date().toLocaleString()
        }
        : note
    })

    return updatedNotes;
}

// (DELETE) удаление заметки
export const deleteNote = (id) => {
    const saved = getNotes();
    const updatedNotes = saved.filter((note) => note.id !== id);
    return updatedNotes;
}

