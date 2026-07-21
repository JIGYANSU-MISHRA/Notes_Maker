import React, { useState } from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) {
      return;
    }
    await onUpdate(note._id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className="note-card">
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '10px' }}>
            <input type="text" className="notes-input" value={editTitle} onChange={(e) => 
            setEditTitle(e.target.value)} placeholder="Note Title" required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea className="notes-textarea" value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Note Content"
              required
            />
          </div>
          <div>
            <button type="submit" className="notes-add-btn" style={{ padding: '6px 16px', fontSize: '0.85rem', marginRight: '8px' }}>
              Save Changes
            </button>
            <button type="button" className="btn-edit" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="note-card-title">{note.title}</h3>
          <p className="note-card-content">{note.content}</p>
          <div className="note-card-footer">
            <span className="note-card-date">{formatDate(note.createdAt)}</span>
            <div className="note-card-actions">
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => onDelete(note._id)}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
