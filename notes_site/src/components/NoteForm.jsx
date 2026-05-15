import '../styles/NoteForm.css';

// компонент формы ввода для создания заметки и кнопки добавить заметку
function NoteForm({ title, setTitle, text, setText, onSubmit }) {
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
          <button onClick={onSubmit} className="form__button">
              Добавить заметку
          </button>
      </div>
  );
}

export default NoteForm;