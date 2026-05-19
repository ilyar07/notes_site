import { useState } from 'react';

// хук для управления состоянием фильтров и сортировки
export const useFilters = () => {
    const [search, setSearch] = useState('');
    // date-desc, date-asc, priority-high, priority-low, updated-desc, updated-asc, alpha-asc, alpha-desc
    const [sortBy, setSortBy] = useState('date-desc');
    const [showOnlyPinned, setShowOnlyPinned] = useState(false);
    const [filterType, setFilterType] = useState('all'); // 'all', 'text', 'checklist'
    const [selectedTags, setSelectedTags] = useState([]);
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false); // показывать ли выпадающее окно со всеми тегами

    // выбрать тэг
    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    // функция отображения выбранных тэгов
    const getDisplayTags = () => {
        if (selectedTags.length === 0) return 'Все теги';
        if (selectedTags.length <= 3) return selectedTags.join(', ');
        return `${selectedTags.slice(0, 3).join(', ')}... (+${selectedTags.length - 3})`;
    };

    // сбросить фильтры
    const resetFilters = () => {
        setShowOnlyPinned(false);
        setFilterType('all');
        setSelectedTags([]);
    };

    return {
        search,
        setSearch,
        sortBy,
        setSortBy,
        showOnlyPinned,
        setShowOnlyPinned,
        filterType,
        setFilterType,
        selectedTags,
        setSelectedTags,
        isTagDropdownOpen,
        setIsTagDropdownOpen,
        toggleTag,
        getDisplayTags,
        resetFilters
    };
};