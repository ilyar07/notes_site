import '../styles/NoteCard.css';

// компонент заметки
function NoteCard({ note, onEdit, onDelete }) {
    return (
        <div key={note.id} className="note-card">
            <div className="note-card__header">  
                <h3 className="note-card__title">{note.title || 'Без заголовка'}</h3>
                <div className='note-card__actions'>
                    <button
                        onClick={() => onEdit(note)}
                        className="note-card__edit"
                    >✏️</button>

                    <button
                        onClick={() => onDelete(note.id)}
                        className="note-card__delete"
                    >🗑️</button>
                </div>
            </div>
            <p className="note-card__text">{note.text}</p>
            <time className="note-card__date">
                {note.createdAt}
                {note.updatedAt && (` Изменено: ${note.updatedAt}`)}
            </time>
        </div>
    )
}

export default NoteCard;