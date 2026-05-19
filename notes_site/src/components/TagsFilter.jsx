// компонент фильтрации по тэгам
function TagsFilter({
    selectedTags,
    setSelectedTags,
    isTagDropdownOpen,
    setIsTagDropdownOpen,
    getAllTags,
    toggleTag,
    getDisplayTags
}) {
    return (
        <div className="filter-tags-row">
            <div className="filter-tags">
                <span className="filter-label">🏷️ Теги:</span>
                <div className="tag-dropdown-container">
                    <button
                        type="button"
                        className="tag-dropdown-trigger"
                        onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                    >
                        🏷️ {getDisplayTags()} ▼
                    </button>
                    {isTagDropdownOpen && (
                        <div className="tag-dropdown">
                            {getAllTags().map(tag => (
                                <label key={tag} className="tag-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => toggleTag(tag)}
                                    />
                                    🏷️ {tag}
                                </label>
                            ))}
                            {getAllTags().length === 0 && (
                                <div className="tag-dropdown-empty">Нет тегов</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {selectedTags.length > 0 && (
                <button className="clear-tags-btn" onClick={() => setSelectedTags([])}>
                    ✕ Очистить
                </button>
            )}
        </div>
    );
}

export default TagsFilter;