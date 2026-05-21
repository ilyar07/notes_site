import { useEffect, useRef } from 'react';
import NoteCard from './NoteCard';

function NotesList({
    notes,
    viewMode,
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
    setTagInputValue,

    onShare,
    onShowComments
}) {
    const gridRef = useRef(null);
    const masonryRef = useRef(null);

    useEffect(() => {
        if (viewMode === 'grid' && gridRef.current) {
            if (masonryRef.current) {
                masonryRef.current.destroy();
            }

            const initMasonry = async () => {
                const Masonry = (await import('masonry-layout')).default;
                masonryRef.current = new Masonry(gridRef.current, {
                    itemSelector: '.note-card',
                    columnWidth: '.note-card',
                    gutter: 20,
                    fitWidth: true,
                    transitionDuration: 0
                });
            };
            initMasonry();
        }

        return () => {
            if (masonryRef.current) {
                masonryRef.current.destroy();
            }
        };
    }, [notes, viewMode]);

    if (viewMode === 'list') {
        return (
            <div className="notes-list notes-list--list">
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

                        onShare={onShare}
                        onShowComments={onShowComments}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="notes-list notes-list--grid-container">
            <div ref={gridRef} className="notes-list--grid">
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

                        onShare={onShare}
                        onShowComments={onShowComments}
                    />
                ))}
            </div>
        </div>
    );
}

export default NotesList;