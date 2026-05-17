import { useState, useEffect } from 'react';
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
    const [editingId, setEditingId] = useState(null);
    const [notes, setNotes] = useLocalStorage('notes', []);
    const [checklists, setChecklists] = useLocalStorage('checklist_notes', []);


    // ------------------------------------общие методы для создания и удаления заметок-----------------------


    //сбросить форму ввода
    const resetForm = () => {
        setTitle('');
        setText('');
        setType('text');
        setEditingId(null);
    };

    // метод для кнопки добавить заметку
    const addNote = () => {
        if (type === 'text') {
            if (!title && !text) return;
            const updatedNotes = createNote(title, text);
            setNotes(updatedNotes);
        } else {
            if (!title) return;
            const updatedChecklists = createChecklist(title, []);
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
        setTitle(note.title);
        setText(note.type === 'text' ? note.text : '');
        setType(note.type);
        setEditingId(note.id);
    }

    // метод для кнопки отменить редактирование заметки
    const handleCanсelUpdate = () => {
        resetForm();
    }

    // метод для кнопки сохранить изменения заметки
    const handleUpdateNote = () => {
        if (type === 'text') {
            if (!title && !text) return;
            const updatedNotes = updateNote(editingId, title, text);
            setNotes(updatedNotes);
        } else {
            if (!title) return;
            const checklist = checklists.find(c => c.id === editingId);
            if (checklist) {
                const updatedChecklists = updateChecklist(editingId, title);
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


    //-------------------------------------------фильтрация---------------------------------------------------------


    // заметки отфлитрованые по содержанию строки search
    const getFilteredNotes = () => {
        const allNotes = [...notes, ...checklists].sort((a, b) => b.id - a.id);
        const lowerSearch = search.toLowerCase();

        return allNotes.filter(note => {
            if (note.type === 'text') {
                return note.title?.toLowerCase().includes(lowerSearch) ||
                    note.text?.toLowerCase().includes(lowerSearch);
            } else {
                return note.title?.toLowerCase().includes(lowerSearch);
            }
        });
    };

    const filteredNotes = getFilteredNotes();

    return (
        <div className="app">
            <h1 className="app__title">Мои заметки</h1>

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
                onSubmit={handleSubmit}
                onCancel={handleCanсelUpdate}
                isEditing={!!editingId}
            />
            <hr className="divider" />

            {/* счетчик заметок */}
            <div className="stats">
                <h2 className="stats__title">
                    Список заметок
                    <span className="stats__count">{filteredNotes.length}</span>
                </h2>
            </div>

            {/* сам список заметок */}
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
                    />
                ))}
            </div>
        </div>
    )
}

export default App;