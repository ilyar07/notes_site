const STORAGE_KEY = 'checklist_notes'



//------------------------------------------ для работы с самим чек листом --------------------------------


// (CREATE) создать чек лист
export const createChecklist = (title, items=[]) => {
    const saved = getChecklists();
    const newChecklist = {
        id: Date.now(),
        type: 'checklist',
        title: title,
        items: items,
        createdAt: new Date().toLocaleString()
    }

    return [newChecklist, ...saved];
}

// (READ) получить все чек листы
export const getChecklists = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

// (UPDATE) обновить чек лист (заголок, весь список задач)
export const updateChecklist = (id, title, item) => {
    const saved = getChecklists();
    return saved.map((checklist) => checklist.id === id ? { ...checklist, title: title, items: item } : checklist);
}

// (DELETE) удалить чек лист
export const deleteChecklist = (id) => {
    const saved = getChecklists();
    return saved.filter((checklist) => checklist.id !== id);
}


//------------------------------------------- для работы с задачами внутри чек листа -------------------------------------


// добавить задачу в чек лист
export const addTaskToChecklist = (checklistId, textTask) => {
    const saved = getChecklists();
    const checklist = saved.find(c => c.id === checklistId);

    const newTask = {
        id: Date.now(),
        text: textTask,
        completed: false
    }

    const updatedChecklist = {
        ...checklist,
        items: [...checklist.items, newTask],
        updatedAt: new Date().toLocaleString()
    }

    return saved.map(c => c.id === checklistId ? updatedChecklist : c);
}

// поменять состояние задачи в чек листе (сделано / не сделано)
export const toggleTaskInChecklist = (checklistId, taskId) => {
    const saved = getChecklists();
    const checklist = saved.find(c => c.id === checklistId);

    const updatedItems = checklist.items.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task);
    const updatedChecklist = {
        ...checklist,
        items: updatedItems,
        updatedAt: new Date().toLocaleString()
    }

    return saved.map((c) => c.id === checklistId ? updatedChecklist : c);
}

// удалить задачу из таск листа
export const deleteTaskFromChecklist = (checklistId, taskId) => {
    const saved = getChecklists();
    const checklist = saved.find(c => c.id === checklistId);

    const updatedItems = checklist.items.filter((t) => t.id !== taskId);
    const updatedChecklist = {
        ...checklist,
        items: updatedItems,
        updatedAt: new Date().toLocaleString()
    }

    return saved.map(c => c.id === checklistId ? updatedChecklist : c);
}