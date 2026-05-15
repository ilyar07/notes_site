const STORAGE_KEY = 'notes';


// вспомогателная функция сохранения заметки в localStorage конкретно для этого файла
const saveNote = (note) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(note));
}


// (CREATE) создание заметки
export const createNote = (title, text) => {
    const saved = getNotes();
    const newNote = {
        id: Date.now(),
        title: title,
        text: text,
        createdAt: new Date().toLocaleString()
    }

    const updateNotes = [newNote, ...saved];
    saveNote(updateNotes);
    return updateNotes;
}

// (READ) получение всех заметок
export const getNotes = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
}

// (DELETE) удаление заметки
export const deleteNote = (id) => {
    const saved = getNotes();
    const updateNotes = saved.filter((note) => note.id !== id);
    saveNote(updateNotes);
    return updateNotes;
}

