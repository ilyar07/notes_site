// хук для операций с тэгами (добавление, удаление)
export const useTagsOperations = (notes, setNotes, checklists, setChecklists) => {
    // добавить тэг к заметке
    const addTag = (id, type, tagName, setIdShowTagInput, setTagInputValue) => {
        if (!tagName.trim()) return;
        const newTag = tagName.trim().toLowerCase();

        if (type === 'text') {
            const updatedNotes = notes.map(note => {
                if (note.id === id) {
                    const tags = note.tags || [];
                    if (tags.includes(newTag)) return note;
                    return { ...note, tags: [...tags, newTag] };
                }
                return note;
            });
            setNotes(updatedNotes);
        } else {
            const updatedChecklists = checklists.map(c => {
                if (c.id === id) {
                    const tags = c.tags || [];
                    if (tags.includes(newTag)) return c;
                    return { ...c, tags: [...tags, newTag] };
                }
                return c;
            });
            setChecklists(updatedChecklists);
        }
        setIdShowTagInput(null);
        setTagInputValue('');
    };

    // удалить тэг из заметки
    const deleteTag = (id, noteType, tagName) => {
        if (noteType === 'text') {
            const updatedNotes = notes.map(note => {
                if (note.id === id) {
                    return { ...note, tags: (note.tags || []).filter(t => t !== tagName) };
                }
                return note;
            });
            setNotes(updatedNotes);
        } else {
            const updatedChecklists = checklists.map(checklist => {
                if (checklist.id === id) {
                    return { ...checklist, tags: (checklist.tags || []).filter(t => t !== tagName) };
                }
                return checklist;
            });
            setChecklists(updatedChecklists);
        }
    };

    return { addTag, deleteTag };
};