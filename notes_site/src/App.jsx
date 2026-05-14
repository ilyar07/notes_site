import { useState } from 'react';

function App() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [notes, setNotes] = useState([]);

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

    return (
        <div>
            <h1>Мои заметки</h1>
            <input
                type='text'
                placeholder='Заголовок'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></input>
            <textarea
                placeholder='Текст'
                value={text}
                onChange={(e) => setText(e.target.value)}
            >
            </textarea>
            <button onClick={addNotes}>добавить заметку</button>
            <hr></hr>
            <h1>Список заметок кол-во:{notes.length}</h1>
            {notes.map(note =>
                <div key={note.id}>
                    <h1>{note.title}</h1>
                    <p>{note.text}</p>
                    <p>{note.createdAt}</p>
                </div>
            )}
        </div>

    )
}

export default App;