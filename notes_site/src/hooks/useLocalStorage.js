import { useState, useEffect } from 'react';

// для работы с localstorage сохранениe/загрузка
function useLocalStorage(key, initialValue) {

    // загрузка при первом рендере
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    })

    // сохранение при добавлении
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage;