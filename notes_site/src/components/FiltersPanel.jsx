import FiltersRow from './FiltersRow';
import SortRow from './SortRow';
import TagsFilter from './TagsFilter';

// компонент всей панели фильтрации
function FiltersPanel({
    showOnlyPinned, setShowOnlyPinned,
    filterType, setFilterType,
    sortBy, setSortBy,
    selectedTags, setSelectedTags,
    isTagDropdownOpen, setIsTagDropdownOpen,
    getAllTags, toggleTag, getDisplayTags
}) {
    return (
        <div className="filters-panel">
            <FiltersRow
                showOnlyPinned={showOnlyPinned}
                setShowOnlyPinned={setShowOnlyPinned}
                filterType={filterType}
                setFilterType={setFilterType}
            />

            <SortRow sortBy={sortBy} setSortBy={setSortBy} />

            <TagsFilter
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                isTagDropdownOpen={isTagDropdownOpen}
                setIsTagDropdownOpen={setIsTagDropdownOpen}
                getAllTags={getAllTags}
                toggleTag={toggleTag}
                getDisplayTags={getDisplayTags}
            />
        </div>
    );
}

export default FiltersPanel;