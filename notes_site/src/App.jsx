import { useState, useEffect, useRef } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import {
    createNote,
    deleteNote,
    updateNote
} from './services/noteCRUD';
import {
    createChecklist,
    deleteChecklist,
    updateChecklist,
    toggleTaskInChecklist,
    addTaskToChecklist,
    deleteTaskFromChecklist,
    updateTaskInChecklist
} from './services/checklistCRUD';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import './styles/App.css';


function App() {
    const [title, setTitle] = useState(''); 
    const [text, setText] = useState('');
    const [type, setType] = useState('text');
    const [search, setSearch] = useState('');
    const [priority, setPriority] = useState('medium'); // high, medium, low
    const [editingId, setEditingId] = useState(null);
    const [notes, setNotes] = useLocalStorage('notes', []);
    const [checklists, setChecklists] = useLocalStorage('checklist_notes', []);
    const formRef = useRef(null);
    // date-desc, date-asc, priority-high, priority-low, updated-desc, updated-asc, alpha-asc, alpha-desc
    const [sortBy, setSortBy] = useState('date-desc'); 
    const [tagInputValue, setTagInputValue] = useState('');
    const [idShowTagInput, setIdShowTagInput] = useState(null) // id заметки у которой покозывать форму ввода нового тега
    const [showOnlyPinned, setShowOnlyPinned] = useState(false);
    const [filterType, setFilterType] = useState('all'); // 'all', 'text', 'checklist'



    // ----общие методы для создания, удаления заметок, закрепления заметок, изменения цвета, смены приоритета, дублирования------


    //сбросить форму ввода
    const resetForm = () => {
        setTitle('');
        setText('');
        setType('text');
        setPriority('medium');
        setEditingId(null);

    };

    // метод для кнопки добавить заметку
    const addNote = () => {
        if (type === 'text') {
            if (!title && !text) return;
            const updatedNotes = createNote(title, text, priority);
            setNotes(updatedNotes);
        } else {
            if (!title) return;
            const updatedChecklists = createChecklist(title, [], priority);
            setChecklists(updatedChecklists);
        }
        resetForm();
    };

    // метод для кнопки удаление заметки
    const handleDeleteNote = (id, noteType) => {
        if (confirm('Удалить заметку?')) {
            if (noteType === 'text') {
                const updatedNotes = deleteNote(id);
                setNotes(updatedNotes);
            } else {
                const updatedChecklists = deleteChecklist(id);
                setChecklists(updatedChecklists);
            }
        }
    }

    //метод для кнопки закрепить заметку
    const handleTogglePin = (id, noteType) => {
        if (noteType === 'text') {
            const updatedNotes = notes.map(note => note.id === id ? { ...note, pinned: !note.pinned } : note);
            setNotes(updatedNotes);
        } else {
            const updatedChecklist = checklists.map(checklist => checklist.id === id ? {
                ...checklist,
                pinned: !checklist.pinned
            } : checklist)
            setChecklists(updatedChecklist);
        }
    }

    // метод для замены цвета
    const handleChangeColor = (id, type, color) => {
        if (type === 'text') {
            const updatedNotes = notes.map(note => note.id === id ?
                { ...note, color: color } :
                note
            );
            setNotes(updatedNotes);
        } else {
            const updatedChecklists = checklists.map(c => c.id === id ?
                { ...c, color: color } :
                c
            );
            setChecklists(updatedChecklists);
        }
    }

    // метод для смены приоритета
    const handleChangePriority = (id, type, newPriority) => {
        if (type === 'text') {
            const updatedNotes = notes.map(note => note.id === id ? { ...note, priority: newPriority } : note);
            setNotes(updatedNotes);
        } else {
            const updatedChecklists = checklists.map(c => c.id === id ? { ...c, priority: newPriority } : c);
            setChecklists(updatedChecklists);
        }
    }

    // метод для дублирования заметки
    const handleDuplicateNote = (id, noteType) => {
        if (noteType === 'text') {
            const originalNote = notes.find(n => n.id === id);
            if (originalNote) {
                const duplicatedNote = {
                    ...originalNote,
                    id: Date.now(),
                    title: `${originalNote.title} (копия)`,
                    createdAt: new Date().toLocaleString()
                };
                setNotes([duplicatedNote, ...notes]);
            }
        } else {
            const originalChecklist = checklists.find(c => c.id === id);
            if (originalChecklist) {
                const duplicatedChecklist = {
                    ...originalChecklist,
                    id: Date.now(),
                    title: `${originalChecklist.title} (копия)`,
                    createdAt: new Date().toLocaleString()
                };
                setChecklists([duplicatedChecklist, ...checklists]);
            }
        }
    };

    //------------------------------------методы для удаления и добавления тэгов--------------------------------------


    // добавить тэг к заметке
    const handleAddTag = (id, type, tagName) => {
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
    }

    // удалить тэг из заметки
    const handleDeleteTag = (id, noteType, tagName) => {
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


    //------------------------------------методы для редактирования заметок--------------------------------------


    //общий обработчик (решает обновить или создать)
    const handleSubmit = () => {
        if (editingId) {
            handleUpdateNote();
        } else {
            addNote();
        }
    }

    // метод для кнопки начать редактирование заметки
    const handleStartUpdate = (note) => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTitle(note.title);
        setText(note.type === 'text' ? note.text : '');
        setType(note.type);
        setPriority(note.priority || 'medium');
        setEditingId(note.id);
    }

    // метод для кнопки отменить редактирование заметки
    const handleCancelUpdate = () => {
        resetForm();
    }

    // метод для кнопки сохранить изменения заметки
    const handleUpdateNote = () => {
        if (type === 'text') {
            if (!title && !text) return;
            const updatedNotes = updateNote(editingId, title, text, priority);
            setNotes(updatedNotes);
        } else {
            if (!title) return;
            const checklist = checklists.find(c => c.id === editingId);
            if (checklist) {
                const updatedChecklists = updateChecklist(editingId, title, priority);
                setChecklists(updatedChecklists)
            }
        }
        resetForm();
    }

    // метод для кнопки редактировать заметку
    const handleUpdateTask = (checklistId, taskId, newText) => {
        const updatedChecklists = updateTaskInChecklist(checklistId, taskId, newText);
        setChecklists(updatedChecklists);
    };


    //---------------------------------------------методы для работы с задачами в чек листах-------------------------------


    // метод для нажатия на задачу
    const handleToggleTask = (checklistId, taskId) => {
        const updatedChecklists = toggleTaskInChecklist(checklistId, taskId);
        setChecklists(updatedChecklists);
    }

    // метод для добавления задачи
    const handleAddTask = (checklistId, taskText) => {
        const updatedChecklists = addTaskToChecklist(checklistId, taskText);
        setChecklists(updatedChecklists);
    };

    // метод для удаления задачи
    const handleDeleteTask = (checklistId, taskId) => {
        if (confirm('Удалить задачу?')) {
            const updatedChecklists = deleteTaskFromChecklist(checklistId, taskId);
            setChecklists(updatedChecklists);
        }
    }


    //-------------------------------------------фильтрация и сортировка---------------------------------------------------------


    // заметки отфлитрованые по содержанию строки search и по выбраному порядку (закрепленные всегда первые)
    const getFilteredNotes = () => {
        const allNotes = [...notes, ...checklists];
        const validNotes = allNotes.filter(note => note !== null);
        const lowerSearch = search.toLowerCase();

        let filtered = validNotes.filter(note => {
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

        const priorityOrder = { high: 3, medium: 2, low: 1 };

        filtered.sort((a, b) => {
            // сначала закреплённые
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;

            // потом по выбранной сортировке

            // по приоритету
            if (sortBy === 'priority-high') {
                return (priorityOrder[b.priority || 'medium'] || 0) - (priorityOrder[a.priority || 'medium'] || 0);
            } else if (sortBy === 'priority-low') {
                return (priorityOrder[a.priority || 'medium'] || 0) - (priorityOrder[b.priority || 'medium'] || 0);
            // по дате создания
            } else if (sortBy === 'date-desc') {
                return b.id - a.id;
            } else if (sortBy === 'date-asc') {
                return a.id - b.id;
            // по дате изменения
            } else if (sortBy === 'updated-desc') {
                const parseDate = (dateStr) => {
                    if (!dateStr) return new Date(0);
                    const [datePart, timePart] = dateStr.split(', ');
                    const [day, month, year] = datePart.split('.');
                    const [hours, minutes, seconds] = timePart.split(':');
                    return new Date(year, month - 1, day, hours, minutes, seconds);
                };
                const dateA = a.updatedAt ? parseDate(a.updatedAt) : parseDate(a.createdAt);
                const dateB = b.updatedAt ? parseDate(b.updatedAt) : parseDate(b.createdAt);
                return dateB - dateA;
            } else if (sortBy === 'updated-asc') {
                const parseDate = (dateStr) => {
                    if (!dateStr) return new Date(0);
                    const [datePart, timePart] = dateStr.split(', ');
                    const [day, month, year] = datePart.split('.');
                    const [hours, minutes, seconds] = timePart.split(':');
                    return new Date(year, month - 1, day, hours, minutes, seconds);
                };
                const dateA = a.updatedAt ? parseDate(a.updatedAt) : parseDate(a.createdAt);
                const dateB = b.updatedAt ? parseDate(b.updatedAt) : parseDate(b.createdAt);
                return dateA - dateB;
            // по алфавиту
            } else if (sortBy === 'alpha-asc') {
                return (a.title || '').localeCompare(b.title || '', 'ru');
            } else if (sortBy === 'alpha-desc') {
                return (b.title || '').localeCompare(a.title || '', 'ru');
            }
            return b.id - a.id;
        });

        return filtered;
    };

    const filteredNotes = getFilteredNotes();


    return (
        <div className="app">
            <h1 className="app__title" ref={formRef}>Мои заметки</h1>

            {/* выбор фильтрации */ }
            <div className="filters-panel">
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

                <div className="sort-row">
                    <span className="sort-label">🔽🔼 Сортировка:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="date-desc">📅 Сначала новые (по созданию)</option>
                        <option value="date-asc">📅 Сначала старые (по созданию)</option>
                        <option value="updated-desc">🕐 Сначала новые (по изменению)</option>
                        <option value="updated-asc">🕐 Сначала старые (по изменению)</option>
                        <option value="alpha-asc">🔤 По алфавиту (А → Я)</option>
                        <option value="alpha-desc">🔤 По алфавиту (Я → А)</option>
                        <option value="priority-high">🟥 Приоритет (высокий → низкий)</option>
                        <option value="priority-low">🟩 Приоритет (низкий → высокий)</option>
                    </select>
                </div>
            </div>

            {/* поиск по слову */ }
            <SearchBar search={search} setSearch={setSearch} />

            {/* форма для создания заметки */ }
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

            {/* счетчик заметок */ }
            <div className="stats">
                <h2 className="stats__title">
                    Список заметок
                    <span className="stats__count">{filteredNotes.length}</span>
                </h2>
            </div>

            {/* сам список заметок */ }
            <div className="notes-list">
                {filteredNotes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onDelete={handleDeleteNote}
                        onEdit={handleStartUpdate}
                        onDuplicate={handleDuplicateNote}

                        onToggleTask={handleToggleTask}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}

                        onTogglePin={handleTogglePin}
                        onChangeColor={handleChangeColor}
                        onChangePriority={handleChangePriority}

                        onAddTag={handleAddTag}
                        onDeleteTag={handleDeleteTag}
                        idShowTagInput={idShowTagInput}
                        setIdShowTagInput={setIdShowTagInput}
                        tagInputValue={tagInputValue}
                        setTagInputValue={setTagInputValue}
                    />
                ))}
            </div>
        </div>
    )
}

export default App;