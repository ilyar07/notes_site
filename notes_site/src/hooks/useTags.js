// хук для получения всех существующих тэгов
export const useTags = (notes, checklists) => {
    const getAllTags = () => {
        const allNotes = [...notes, ...checklists];
        const tagsSet = new Set();
        allNotes.forEach(note => {
            note.tags?.forEach(tag => tagsSet.add(tag));
        });
        return Array.from(tagsSet);
    };

    return { getAllTags };
};