import ChecklistViewer from './ChecklistViewer';
import '../styles/NoteCard.css';

// компонент заметки
function NoteCard({ note, onEdit, onDelete, onToggleTask, onAddTask }) {
    const isChecklist = note.type === 'checklist';

    return (
        <div key={note.id} className="note-card">

            {/*заголовок*/}
            <div className="note-card__header">  
                <h3 className="note-card__title">
                    {isChecklist ? '☑️ ' : '📝 '}
                    {note.title || 'Без заголовка'}
                </h3>

                {/*кнопки удалить и редактировать*/}
                <div className='note-card__actions'>
                    <button
                        onClick={() => onEdit(note)}
                        className="note-card__edit"
                    >✏️</button>

                    <button
                        onClick={() => onDelete(note.id, note.type)}
                        className="note-card__delete"
                    >🗑️</button>
                </div>
            </div>

            {/* если текстовая заметка отображаем текст*/}
            {!isChecklist && (
                <p className="note-card__text">{note.text}</p>
            )}

            {/* если чек лист выводим задачи*/}
            {isChecklist && (
                <ChecklistViewer
                    items={note.items || []}
                    onToggleTask={(taskId) => onToggleTask(note.id, taskId)}
                    onAddTask={(taskText) => onAddTask(note.id, taskText)}
                />
            )}
            {/*время создания/изменения*/}
            <time className="note-card__date">
                {note.createdAt}
                {note.updatedAt && (` Изменено: ${note.updatedAt}`)}
            </time>
        </div>
    )
}

export default NoteCard;