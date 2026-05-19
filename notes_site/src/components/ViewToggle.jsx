// компонент переключателя отображения (список / плитка)
function ViewToggle({ viewMode, setViewMode }) {
    return (
        <div className="view-toggle">
            <button
                className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Список"
            >
                📄 Список
            </button>
            <button
                className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Плитка"
            >
                🧩 Плитка
            </button>
        </div>
    );
}

export default ViewToggle;