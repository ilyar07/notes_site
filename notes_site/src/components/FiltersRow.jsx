// компонент строки фильтрации (закреплённые и тип)
function FiltersRow({ showOnlyPinned, setShowOnlyPinned, filterType, setFilterType }) {
    return (
        <div className="filters-row">
            <label className="filter-checkbox">
                <input
                    type="checkbox"
                    checked={showOnlyPinned}
                    onChange={(e) => setShowOnlyPinned(e.target.checked)}
                />
                📌 Только закреплённые
            </label>

            <div className="filter-type">
                <span className="filter-label">Тип:</span>
                <label className="filter-radio">
                    <input
                        type="radio"
                        name="type"
                        value="all"
                        checked={filterType === 'all'}
                        onChange={() => setFilterType('all')}
                    />
                    Все
                </label>
                <label className="filter-radio">
                    <input
                        type="radio"
                        name="type"
                        value="text"
                        checked={filterType === 'text'}
                        onChange={() => setFilterType('text')}
                    />
                    📝 Текст
                </label>
                <label className="filter-radio">
                    <input
                        type="radio"
                        name="type"
                        value="checklist"
                        checked={filterType === 'checklist'}
                        onChange={() => setFilterType('checklist')}
                    />
                    ☑️ Чек-лист
                </label>
            </div>
        </div>
    );
}

export default FiltersRow;