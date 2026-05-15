import '../styles/SearchBar.css';

// компонет формы ввода для поиска заметок по тексту
function SearchBar({ search, setSearch }) {
  return (
      <div className="search">
          <input
              type="text"
              placeholder="Поиск по заметкам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search__input"
          />
      </div>
  );
}

export default SearchBar;