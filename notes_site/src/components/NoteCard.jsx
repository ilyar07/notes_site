import ChecklistViewer from './ChecklistViewer';
import '../styles/NoteCard.css';

// компонент заметки
function NoteCard({ note, onEdit,
    onDelete,
    onToggleTask,
    onAddTask,
    onDeleteTask,
    onUpdateTask,
    onTogglePin,
    onChangeColor
    }) {
    const isChecklist = note.type === 'checklist';

    // функция для определения нужного цвета текста в заметках
    const getTextColor = (backgroundColor) => {
        if (!backgroundColor || backgroundColor === '#ffffff') return '#1a202c';

        let r, g, b;
        if (backgroundColor.startsWith('#')) {
            r = parseInt(backgroundColor.slice(1, 3), 16);
            g = parseInt(backgroundColor.slice(3, 5), 16);
            b = parseInt(backgroundColor.slice(5, 7), 16);
        } else {
            return '#1a202c';
        }

        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        return brightness < 128 ? '#ffffff' : '#1a202c';
    };


    return (
        <div key={note.id} className="note-card" style={{ backgroundColor: note.color || '#ffffff' }}>

            {/*заголовок*/}
            <div className="note-card__header">  
                <h3 className="note-card__title" style={{ color: getTextColor(note.color) }}>
                    {note.pinned && '📌 '}
                    {isChecklist ? '☑️ ' : '📝 '}
                    {note.title || 'Без заголовка'}
                </h3>

                {/*кнопки удалить, редактировать, запинить и выбрать цвет*/}
                <div className='note-card__actions'>

                    <label className="color-picker-label" title="Выбрать цвет">
                        <input
                            type="color"
                            value={note.color || '#ffffff'}
                            onChange={(e) => onChangeColor(note.id, note.type, e.target.value)}
                            className="note-card__color-input"
                        />
                        <span className="note-card__color-icon">🎨</span>
                    </label>

                    <button
                        onClick={() => onTogglePin(note.id, note.type)}
                        className={`note-card__pin ${note.pinned ? 'note-card__pin--active' : ''}`}
                        title={note.pinned ? 'Открепить' : 'Закрепить'}
                    >
                        📌
                    </button>

                    <button
                        onClick={() => onEdit(note)}
                        className="note-card__edit"
                        title='Редактировать'
                    >✏️</button>

                    <button
                        onClick={() => onDelete(note.id, note.type)}
                        className="note-card__delete"
                        title='Удалить'
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
                    onDeleteTask={(taskId) => onDeleteTask(note.id, taskId)}
                    onUpdateTask={(taskId, newText) => onUpdateTask(note.id, taskId, newText)}
                />
            )}
            {/*время создания/изменения*/}
            <time className="note-card__date" style={{ color: getTextColor(note.color) }}>
                {note.createdAt}
                {note.updatedAt && (` Изменено: ${note.updatedAt}`)}
            </time>
        </div>
    )
}

export default NoteCard;