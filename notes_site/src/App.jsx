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
    const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, priority-high, priority-low



    // ----------общие методы для создания, удаления заметок, закрепления заметок, изменения цвета и смены приоритета-----------


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

        const priorityOrder = { high: 3, medium: 2, low: 1 };

        filtered.sort((a, b) => {
            // сначала закреплённые
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;

            // потом по выбранной сортировке
            if (sortBy === 'priority-high') {
                return (priorityOrder[b.priority || 'medium'] || 0) - (priorityOrder[a.priority || 'medium'] || 0);
            } else if (sortBy === 'priority-low') {
                return (priorityOrder[a.priority || 'medium'] || 0) - (priorityOrder[b.priority || 'medium'] || 0);
            } else if (sortBy === 'date-desc') {
                return b.id - a.id;
            } else if (sortBy === 'date-asc') {
                return a.id - b.id;
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
            <div className="sort-section">
                <label className="sort-label">Сортировка:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="date-desc">📅 Сначала новые</option>
                    <option value="date-asc">📅 Сначала старые</option>
                    <option value="priority-high">🟥 Приоритет (высокий → низкий)</option>
                    <option value="priority-low">🟩 Приоритет (низкий → высокий)</option>
                </select>
            </div>

            {/* поиск по слову */}
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
                        onToggleTask={handleToggleTask}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}
                        onTogglePin={handleTogglePin}
                        onChangeColor={handleChangeColor}
                        onChangePriority={handleChangePriority}
                    />
                ))}
            </div>
        </div>
    )
}

export default App;