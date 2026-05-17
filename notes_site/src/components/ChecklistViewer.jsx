import { useState } from 'react';
import '../styles/ChecklistViewer.css';

// компонент для отображения всех задач в чек листе кнопки показать еще и кол-ва выполненых задач
function ChecklistViewer({ items, onToggleTask, onAddTask, onDeleteTask, onUpdateTask }) {
    // нужно ли показывать все
    const [expanded, setExpanded] = useState(false);

    // текст новой задачи
    const [newTaskText, setNewTaskText] = useState('');

    // айди редактируемой задачи
    const [editingTaskId, setEditingTaskId] = useState(null);

    // новый текст для редактируемой задачи
    const [editingTaskText, setEditingTaskText] = useState('');

    // кол-во выполненых
    const completedCount = items.filter(i => i.completed).length;

    // показываемые заметки
    const visibleItems = expanded ? items : items.slice(0, 3);

    // определитель нужна ли кнопка 'показать еще'
    const hasMore = items.length > 3;

    // обработчик добавления задачи
    const handleAddTask = () => {
        if (!newTaskText.trim()) return;
        onAddTask(newTaskText);
        setNewTaskText('');
    };

    // начало редактирования задачи
    const startEditTask = (task) => {
        setEditingTaskId(task.id);
        setEditingTaskText(task.text);
    };

    // сохранить отредактированную задачу
    const saveEditTask = () => {
        if (!editingTaskText.trim()) return;
        onUpdateTask(editingTaskId, editingTaskText);
        setEditingTaskId(null);
        setEditingTaskText('');
    };

    // отменить редактирование задачи 
    const cancelEditTask = () => {
        setEditingTaskId(null);
        setEditingTaskText('');
    };

    return (
        <div className='checklist-viewer'>

            {/*отображаем все задачи*/}
            <div className='checklist-viewer__items'>

                {/* Если задач нет выводим тест */}
                {items.length === 0 && (
                    <div className="checklist-viewer__empty">
                        Нет задач
                    </div>
                )}

                {visibleItems.map(item => (
                    <div key={item.id} className='checklist-viewer__item'>

                        {editingTaskId === item.id ? (

                            // режим редактирования
                            <div className="checklist-viewer__edit-mode">
                                <input
                                    type="text"
                                    value={editingTaskText}
                                    onChange={(e) => setEditingTaskText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && saveEditTask()}
                                    className="checklist-viewer__edit-input"
                                    autoFocus
                                />
                                <button onClick={saveEditTask} className="checklist-viewer__edit-save">✓</button>
                                <button onClick={cancelEditTask} className="checklist-viewer__edit-cancel">✕</button>
                            </div>
                        ) : (
                            // обычный режим
                            <>
                                <label className="checklist-viewer__label">
                                    <input
                                        className="checklist-viewer__checkbox-input"
                                        type='checkbox'
                                        checked={item.completed}
                                        onChange={() => onToggleTask(item.id)}
                                    />
                                    <span className={item.completed ? 'checklist-viewer__text--completed' : ''}>
                                        {item.text}
                                    </span>
                                </label>
                                <div className="checklist-viewer__task-actions">
                                    <button onClick={() => startEditTask(item)} className="checklist-viewer__edit-btn">✏️</button>
                                    <button onClick={() => onDeleteTask(item.id)} className="checklist-viewer__delete-btn">🗑️</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/*если задач >3 показываем кнопку 'показать еще'*/}
            {hasMore && (
                <button
                    className="checklist-viewer__expand"
                    onClick={() => setExpanded(!expanded)}
                >
                    { expanded ? '▲ Скрыть': `▼ Показать ещё (${items.length - 3})` }
                </button>
            )}

            {/* форма добавления новой задачи */ }
            <div className="checklist-viewer__add">
                <input
                    type="text"
                    placeholder="Новая задача..."
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    className="checklist-viewer__input"
                />
                <button onClick={handleAddTask} className="checklist-viewer__add-btn">
                    +
                </button>
            </div>

            {/*прогресс выполнения*/}
            <div className="checklist-viewer__progress">
                Выполнено: {completedCount} / {items.length}
            </div>
        </div>
    )
}

export default ChecklistViewer;