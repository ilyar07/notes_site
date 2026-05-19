// компонент счетчика заметок
function Stats({ count }) {
    return (
        <div className="stats">
            <h2 className="stats__title">
                Список заметок
                <span className="stats__count">{count}</span>
            </h2>
        </div>
    );
}

export default Stats;