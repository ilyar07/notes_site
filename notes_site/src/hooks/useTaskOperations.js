import {
    toggleTaskInChecklist,
    addTaskToChecklist,
    deleteTaskFromChecklist,
    updateTaskInChecklist
} from '../services/checklistCRUD';

// хук для операций с задачами в чек-листах
export const useTaskOperations = (setChecklists) => {
    // метод для нажатия на задачу
    const toggleTask = (checklistId, taskId) => {
        const updatedChecklists = toggleTaskInChecklist(checklistId, taskId);
        setChecklists(updatedChecklists);
    };

    // метод для добавления задачи
    const addTask = (checklistId, taskText) => {
        const updatedChecklists = addTaskToChecklist(checklistId, taskText);
        setChecklists(updatedChecklists);
    };

    // метод для удаления задачи
    const deleteTask = (checklistId, taskId) => {
        if (confirm('Удалить задачу?')) {
            const updatedChecklists = deleteTaskFromChecklist(checklistId, taskId);
            setChecklists(updatedChecklists);
        }
    };

    // метод для обновления задачи
    const updateTask = (checklistId, taskId, newText) => {
        const updatedChecklists = updateTaskInChecklist(checklistId, taskId, newText);
        setChecklists(updatedChecklists);
    };

    return { toggleTask, addTask, deleteTask, updateTask };
};