import { useState, useEffect } from 'react';
import { getCommentsForNote, addComment } from '../services/commentService';

function ShareModal({ note, onClose }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        if (note) {
            setComments(getCommentsForNote(note.id));
        }
    }, [note]);

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        const newComments = addComment(
            note.id,
            commentText,
            author.trim() || 'Аноним'
        );
        setComments(newComments);
        setCommentText('');
        setAuthor('');
    };

    if (!note) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <h2 className="modal-title">📝 {note.title || 'Без заголовка'}</h2>

                <div className="modal-note-content">
                    {note.type === 'text' ? (
                        <p>{note.text}</p>
                    ) : (
                        <div className="modal-checklist">
                            {(note.items || []).map(item => (
                                <div key={item.id} className="modal-checklist-item">
                                    <span>{item.completed ? '✓' : '○'}</span>
                                    <span className={item.completed ? 'completed' : ''}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="modal-comments">
                    <h3>💬 Комментарии ({comments.length})</h3>
                    <div className="comments-list">
                        {comments.length === 0 && (
                            <p className="no-comments">Нет комментариев. Будьте первым!</p>
                        )}
                        {comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-header">
                                    <strong>{comment.author}</strong>
                                    <small>{comment.createdAt}</small>
                                </div>
                                <p className="comment-text">{comment.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="comment-form">
                        <input
                            type="text"
                            placeholder="Ваше имя (необязательно)"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="comment-author"
                        />
                        <textarea
                            placeholder="Напишите комментарий..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="comment-textarea"
                        />
                        <button onClick={handleAddComment} className="comment-submit">
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareModal;