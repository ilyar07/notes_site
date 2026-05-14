import { useState } from 'react';
import './App.css';

function App() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');


    const addNotes = () => {
        if (!title && !text) return;
        const newNote = {
            id: Date.now(),
            title: title,
            text: text,
            createdAt: new Date().toLocaleString()
        }

        setNotes([newNote, ...notes]);
        setTitle('');
        setText('');
    }

    const filterNotes = notes.filter(note => {
        const lowerSearch = search.toLowerCase();
        return note.title.toLowerCase().includes(lowerSearch) || note.text.toLowerCase().includes(lowerSearch);
    })


    return (
        <div className="app">
            <h1 className="app__title">Мои заметки</h1>

            <div className="form">
                <div className="search">
                <input
                    type="text"
                    placeholder="Поиск по заметкам..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search__input"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form__input"
                />
                <textarea
                    placeholder="Текст"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form__textarea"
                />
                <button onClick={addNotes} className="form__button">
                    Добавить заметку
                </button>
            </div>

            <hr className="divider" />

            <div className="stats">
                <h2 className="stats__title">
                    Список заметок
                    <span className="stats__count">{notes.length}</span>
                </h2>
            </div>

            <div className="notes-list">
                {filterNotes.map(note => (
                    <div key={note.id} className="note-card">
                        <h3 className="note-card__title">{note.title || 'Без заголовка'}</h3>
                        <p className="note-card__text">{note.text}</p>
                        <time className="note-card__date">{note.createdAt}</time>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;