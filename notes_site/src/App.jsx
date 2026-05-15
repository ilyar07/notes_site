import { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { createNote, deleteNote, updateNote } from './services/noteCRUD';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [notes, setNotes] = useLocalStorage('notes', []);

    // метод для кнопки добавить заметку
    const addNotes = () => {
        if (!title && !text) return;
        const updatedNotes = createNote(title, text);

        setNotes(updatedNotes);
        setTitle('');
        setText('');
    }

    // метод для кнопки удаление заметки
    const handleDeleteNote = (id) => {
        if (confirm('Удалить заметку?')) {
            const updatedNotes = deleteNote(id);
            setNotes(updatedNotes);
        }
    }

    //общий обработчик (решает обновить или создать)
    const handleSubmit = () => {
        if (editingId) {
            handleUpdateNote();
        } else {
            addNotes();
        }
    }

    // метод для кнопки начать редактирование заметки
    const handleStartUpdate = (note) => {
        setTitle(note.title);
        setText(note.text);
        setEditingId(note.id);
    }

    // метод для кнопки отменить редактирование заметки
    const handleCanselUpdate = () => {
        setTitle('');
        setText('');
        setEditingId(null);
    }

    // метод для кнопки сохранить изменения заметки
    const handleUpdateNote = () => {
        if (!title && !text) return 
        const updatedNotes = updateNote(editingId, title, text);
        setNotes(updatedNotes);
        setTitle('');
        setText('');
        setEditingId(null);
    }

    // заметки отфлитрованые по содержанию строки search
    const filterNotes = notes.filter(note => {
        const lowerSearch = search.toLowerCase();
        return note.title.toLowerCase().includes(lowerSearch) || note.text.toLowerCase().includes(lowerSearch);
    })

    return (
        <div className="app">
            <h1 className="app__title">Мои заметки</h1>
            <SearchBar search={search} setSearch={setSearch} />
            <NoteForm
                title={title}
                setTitle={setTitle}
                text={text}
                setText={setText}
                onSubmit={handleSubmit}
                onCancel={handleCanselUpdate}
                isEditing={!!editingId}
            />
            <hr className="divider" />
            
            <div className="stats">
                <h2 className="stats__title">
                    Список заметок
                    <span className="stats__count">{filterNotes.length}</span>
                </h2>
            </div>

            <div className="notes-list">
                {filterNotes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onDelete={handleDeleteNote}
                        onEdit={handleStartUpdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default App;