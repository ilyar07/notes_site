import NoteCard from './NoteCard';

// компонент списка заметок
function NotesList({
    notes,
    onDelete,
    onEdit,
    onDuplicate,
    onToggleTask,
    onAddTask,
    onDeleteTask,
    onUpdateTask,
    onTogglePin,
    onChangeColor,
    onChangePriority,
    onAddTag,
    onDeleteTag,
    idShowTagInput,
    setIdShowTagInput,
    tagInputValue,
    setTagInputValue
}) {
    return (
        <div className="notes-list">
            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onToggleTask={onToggleTask}
                    onAddTask={onAddTask}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                    onTogglePin={onTogglePin}
                    onChangeColor={onChangeColor}
                    onChangePriority={onChangePriority}
                    onAddTag={onAddTag}
                    onDeleteTag={onDeleteTag}
                    idShowTagInput={idShowTagInput}
                    setIdShowTagInput={setIdShowTagInput}
                    tagInputValue={tagInputValue}
                    setTagInputValue={setTagInputValue}
                />
            ))}
        </div>
    );
}

export default NotesList;