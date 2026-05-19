import { useState, useRef } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { useNotes } from './hooks/useNotes';
import { useFilters } from './hooks/useFilters';
import { useTags } from './hooks/useTags';
import { useTagsOperations } from './hooks/useTagsOperations';
import { useTaskOperations } from './hooks/useTaskOperations';
import { filterNotes } from './utils/filters';
import { sortNotes } from './utils/sorters';
import FiltersPanel from './components/FiltersPanel';
import SearchBar from './components/SearchBar';
import NoteForm from './components/NoteForm';
import Stats from './components/Stats';
import NotesList from './components/NotesList';
import './styles/App.css';

function App() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState('text');
    const [priority, setPriority] = useState('medium'); // high, medium, low
    const [editingId, setEditingId] = useState(null);
    const [notes, setNotes] = useLocalStorage('notes', []);
    const [checklists, setChecklists] = useLocalStorage('checklist_notes', []);
    const formRef = useRef(null);
    const [tagInputValue, setTagInputValue] = useState('');
    const [idShowTagInput, setIdShowTagInput] = useState(null) // id заметки у которой покозывать форму ввода нового тега

    // хуки
    const filters = useFilters();
    const { getAllTags } = useTags(notes, checklists);
    const { addTag, deleteTag } = useTagsOperations(notes, setNotes, checklists, setChecklists);
    const { toggleTask, addTask, deleteTask, updateTask } = useTaskOperations(setChecklists);
    const notesOps = useNotes(notes, setNotes, checklists, setChecklists);

    //сбросить форму ввода
    const resetForm = () => {
        setTitle('');
        setText('');
        setType('text');
        setPriority('medium');
        setEditingId(null);
    };

    // метод для кнопки начать редактирование заметки
    const handleStartUpdate = (note) => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTitle(note.title);
        setText(note.type === 'text' ? note.text : '');
        setType(note.type);
        setPriority(note.priority || 'medium');
        setEditingId(note.id);
    };

    //общий обработчик (решает обновить или создать)
    const handleSubmit = () => {
        if (editingId) {
            notesOps.updateNote(editingId, type, title, text, priority);
        } else {
            notesOps.addNote(type, title, text, priority);
        }
        resetForm();
    };

    // метод для кнопки отменить редактирование заметки
    const handleCancelUpdate = () => {
        resetForm();
    };

    // заметки отфлитрованые по содержанию строки search и по выбраному порядку (закрепленные всегда первые)
    const allNotes = [...notes, ...checklists];
    const validNotes = allNotes.filter(note => note !== null);
    let filtered = filterNotes(validNotes, filters.search, filters.showOnlyPinned, filters.filterType, filters.selectedTags);
    const filteredNotes = sortNotes(filtered, filters.sortBy);

    return (
        <div className="app">
            <h1 className="app__title" ref={formRef}>Мои заметки</h1>

            {/* выбор фильтрации */}
            <FiltersPanel
                showOnlyPinned={filters.showOnlyPinned}
                setShowOnlyPinned={filters.setShowOnlyPinned}
                filterType={filters.filterType}
                setFilterType={filters.setFilterType}
                sortBy={filters.sortBy}
                setSortBy={filters.setSortBy}
                selectedTags={filters.selectedTags}
                setSelectedTags={filters.setSelectedTags}
                isTagDropdownOpen={filters.isTagDropdownOpen}
                setIsTagDropdownOpen={filters.setIsTagDropdownOpen}
                getAllTags={getAllTags}
                toggleTag={filters.toggleTag}
                getDisplayTags={filters.getDisplayTags}
            />

            {/* поиск по слову */}
            <SearchBar search={filters.search} setSearch={filters.setSearch} />

            {/* форма для создания заметки */}
            <NoteForm
                title={title}
                setTitle={setTitle}
                text={text}
                setText={setText}
                type={type}
                setType={setType}
                priority={priority}
                setPriority={setPriority}
                onSubmit={handleSubmit}
                onCancel={handleCancelUpdate}
                isEditing={!!editingId}
            />
            <hr className="divider" />

            {/* счетчик заметок */}
            <Stats count={filteredNotes.length} />

            {/* сам список заметок */}
            <NotesList
                notes={filteredNotes}
                onDelete={(id, noteType) => notesOps.deleteNote(id, noteType)}
                onEdit={handleStartUpdate}
                onDuplicate={notesOps.duplicateNote}
                onToggleTask={toggleTask}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
                onTogglePin={notesOps.togglePin}
                onChangeColor={notesOps.changeColor}
                onChangePriority={notesOps.changePriority}
                onAddTag={(id, type, tagName) => addTag(id, type, tagName, setIdShowTagInput, setTagInputValue)}
                onDeleteTag={deleteTag}
                idShowTagInput={idShowTagInput}
                setIdShowTagInput={setIdShowTagInput}
                tagInputValue={tagInputValue}
                setTagInputValue={setTagInputValue}
            />
        </div>
    )
}

export default App;