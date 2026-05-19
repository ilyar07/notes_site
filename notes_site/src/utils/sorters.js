import { PRIORITY_ORDER } from '../constants';
import { parseDate } from './dateParser';

// сортировка заметок по выбранному параметру
export const sortNotes = (notes, sortBy) => {
    const sorted = [...notes];

    sorted.sort((a, b) => {
        // сначала закреплённые
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        // по приоритету
        if (sortBy === 'priority-high') {
            return (PRIORITY_ORDER[b.priority || 'medium'] || 0) - (PRIORITY_ORDER[a.priority || 'medium'] || 0);
        } else if (sortBy === 'priority-low') {
            return (PRIORITY_ORDER[a.priority || 'medium'] || 0) - (PRIORITY_ORDER[b.priority || 'medium'] || 0);
            // по дате создания
        } else if (sortBy === 'date-desc') {
            return b.id - a.id;
        } else if (sortBy === 'date-asc') {
            return a.id - b.id;
            // по дате изменения
        } else if (sortBy === 'updated-desc') {
            const dateA = a.updatedAt ? parseDate(a.updatedAt) : parseDate(a.createdAt);
            const dateB = b.updatedAt ? parseDate(b.updatedAt) : parseDate(b.createdAt);
            return dateB - dateA;
        } else if (sortBy === 'updated-asc') {
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

    return sorted;
};