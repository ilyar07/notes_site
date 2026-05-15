import '../styles/NoteCard.css';

// компонент заметки
function NoteCard({ note, onDelete }) {
    return (
        <div key={note.id} className="note-card">
            <h3 className="note-card__title">{note.title || 'Без заголовка'}</h3>
            <button
                onClick={() => onDelete(note.id)}
                className="note-card__delete"
            >🗑️</button>
            <p className="note-card__text">{note.text}</p>
            <time className="note-card__date">{note.createdAt}</time>
        </div>
    )
}

export default NoteCard;