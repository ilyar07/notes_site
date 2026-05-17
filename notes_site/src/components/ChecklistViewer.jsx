import { useState } from 'react';
import '../styles/ChecklistViewer.css';

// компонент для отображения всех задач в чек листе кнопки показать еще и кол-ва выполненых задач
function ChecklistViewer({ items, onToggleTask, onAddTask }) {
    // нужно ли показывать все
    const [expanded, setExpanded] = useState(false);

    // текст новой задачи
    const [newTaskText, setNewTaskText] = useState('');

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
                        <label className="checklist-viewer__label">

                            {/*чек бокс*/}
                            <input
                                className="checklist-viewer__checkbox-input"
                                type='checkbox'
                                checked={item.completed}
                                onChange={() => onToggleTask(item.id)}
                            />
                            {/*текст задачи*/}
                            <span className={item.completed ? 'checklist-viewer__text--completed' : ''}>
                                {item.text}
                            </span>
                        </label>
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