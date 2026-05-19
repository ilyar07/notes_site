// Константы приложения

export const PRIORITY_ORDER = {
    high: 3,
    medium: 2,
    low: 1
};

export const SORT_OPTIONS = [
    { value: 'date-desc', label: '📅 Сначала новые (по созданию)' },
    { value: 'date-asc', label: '📅 Сначала старые (по созданию)' },
    { value: 'updated-desc', label: '🕐 Сначала новые (по изменению)' },
    { value: 'updated-asc', label: '🕐 Сначала старые (по изменению)' },
    { value: 'alpha-asc', label: '🔤 По алфавиту (А → Я)' },
    { value: 'alpha-desc', label: '🔤 По алфавиту (Я → А)' },
    { value: 'priority-high', label: '🟥 Приоритет (высокий → низкий)' },
    { value: 'priority-low', label: '🟩 Приоритет (низкий → высокий)' }
];