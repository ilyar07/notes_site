import '../styles/NoteForm.css';

// компонент формы ввода для создания заметки и кнопки добавить заметку
function NoteForm({ title, setTitle,
    text, setText,
    onSubmit, onCancel,
    type, setType,
    isEditing }) {

    const isChecklist = type === 'checklist';

    return (
        
        <div className="form">

            {/* выбор типа заметки */ }
            <div className="type-selector">
                <button
                    type="button"
                    className={`type-selector__btn ${type === 'text' ? 'type-selector__btn--active' : ''}`}
                    onClick={() => setType('text')}
                >
                    📝 Текст
                </button>
                <button
                    type="button"
                    className={`type-selector__btn ${type === 'checklist' ? 'type-selector__btn--active' : ''}`}
                    onClick={() => setType('checklist')}
                >
                    ☑️ Чек-лист
                </button>
            </div>

            {/* ввод заголовка */ }
            <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form__input"
            />

            {/*если обычная заметка отображаем поле для ввода текста*/ }
            {!isChecklist ? (
                <textarea
                    placeholder="Текст"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form__textarea"
                />)
                :  
                (<div className="checklist-hint">
                    {/*если чеклист то ничего*/}
                    {isEditing ? 'Задачи редактируются по отдельности' : 'Чек-лист будет создан'}
                    <br />
                    <small>
                        {isEditing
                            ? 'Нажмите на задачу, чтобы изменить или удалить'
                            : 'Задачи можно добавить после создания'}
                    </small>
                </div>)
            }

            {/*кнопка добавить заметку или сохранить изменения/отмена */}
            <div className='form__buttons'>
                <button onClick={onSubmit} className="form__button">
                    {isEditing ? 'сохранить изменения' :'Добавить заметку' }
                </button>
                {isEditing && (
                    <button className="form__button form__button--cancel" onClick={onCancel}>Отменить</button>
                )}
            </div>
        </div>
    );
}

export default NoteForm;