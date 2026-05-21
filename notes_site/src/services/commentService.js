const STORAGE_KEY = 'comments';

// получить все комментарии
export const getComments = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
};

// сохранить комментарии
const saveComments = (comments) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
};

// получить комментарии для заметки
export const getCommentsForNote = (noteId) => {
    const comments = getComments();
    return comments[noteId] || [];
};

// добавить комментарий
export const addComment = (noteId, text, author = 'Аноним') => {
    const comments = getComments();
    const noteComments = comments[noteId] || [];
    const newComment = {
        id: Date.now(),
        text: text,
        author: author,
        createdAt: new Date().toLocaleString()
    };
    comments[noteId] = [newComment, ...noteComments];
    saveComments(comments);
    return comments[noteId];
};