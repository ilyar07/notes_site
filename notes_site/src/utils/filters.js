// фильтрация заметок по поиску, закреплённым, типу и тегам
export const filterNotes = (notes, search, showOnlyPinned, filterType, selectedTags) => {
    const lowerSearch = search.toLowerCase();

    let filtered = notes.filter(note => {
        if (!note) return false;
        if (note.type === 'text') {
            return note.title?.toLowerCase().includes(lowerSearch) ||
                note.text?.toLowerCase().includes(lowerSearch);
        } else {
            return note.title?.toLowerCase().includes(lowerSearch);
        }
    });

    // фильтрация по закреплённым
    if (showOnlyPinned) {
        filtered = filtered.filter(note => note.pinned === true);
    }

    // фильтрация по типу
    if (filterType !== 'all') {
        filtered = filtered.filter(note => note.type === filterType);
    }

    // филтрация по тэгам
    if (selectedTags.length > 0) {
        filtered = filtered.filter(note =>
            note.tags?.some(tag => selectedTags.includes(tag))
        );
    }

    return filtered;
};