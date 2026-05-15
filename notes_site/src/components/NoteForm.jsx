import '../styles/NoteForm.css';

// компонент формы ввода для создания заметки и кнопки добавить заметку
function NoteForm({ title, setTitle, text, setText, onSubmit, onCancel, isEditing }) {
  return (
      <div className="form">
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
          <div className='form__buttons'>
              <button onClick={onSubmit} className="form__button">
                  {isEditing ? 'сохранить изменения' :'Добавить заметку' }
              </button>
              {isEditing && (
                  <button className="form__button form__button--cancel" onClick={onCancel}>Отменить</button>
              ) }
          </div>
      </div>
  );
}

export default NoteForm;