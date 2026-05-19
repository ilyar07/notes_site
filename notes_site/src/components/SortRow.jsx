import { SORT_OPTIONS } from '../constants';

// компонент строки сортировки
function SortRow({ sortBy, setSortBy }) {
    return (
        <div className="sort-row">
            <span className="sort-label">🔽🔼 Сортировка:</span>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
            >
                {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

export default SortRow;