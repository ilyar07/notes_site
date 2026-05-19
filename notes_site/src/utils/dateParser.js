// парсинг даты из строки "DD.MM.YYYY, HH:MM:SS"

export const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const [datePart, timePart] = dateStr.split(', ');
    const [day, month, year] = datePart.split('.');
    const [hours, minutes, seconds] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds);
};