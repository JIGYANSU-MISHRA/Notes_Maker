import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import './Notes.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const Notes = ({ user, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingNotes, setFetchingNotes] = useState(true);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchNotes = async () => {
    try {
      setFetchingNotes(true);
      const response = await axios.get(`${API_URL}/api/notes`, getAuthHeader());
      setNotes(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        onLogout();
      } else {
        setError('Failed to fetch notes. Please try again.');
      }
    } finally {
      setFetchingNotes(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Please provide both note title and content');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/notes`,
        { title, content },
        getAuthHeader()
      );

      setNotes([response.data, ...notes]);
      
      setTitle('');
      setContent('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add note');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`${API_URL}/api/notes/${noteId}`, getAuthHeader());
      
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/notes/${noteId}`,
        updatedData,
        getAuthHeader()
      );

      setNotes(
        notes.map((note) => (note._id === noteId ? response.data : note))
      );
    } catch (err) {
      setError('Failed to update note');
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-user-bar">
        <div className="notes-welcome">
          Welcome, <span>{user ? user.name : 'User'}</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="notes-card">
        <h1 className="notes-title">Notes-Maker</h1>

        {error && <div className="notes-error">{error}</div>}

        <form onSubmit={handleAddNote}>
          <div className="notes-form-group">
            <input
              type="text"
              className="notes-input"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="notes-form-group">
            <textarea
              className="notes-textarea"
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="notes-btn-container">
            <button type="submit" className="notes-add-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add Note'}
            </button>
          </div>
        </form>
      </div>

      <div className="notes-card">
        <h2 className="notes-subtitle">Your Notes ({notes.length})</h2>

        {fetchingNotes ? (
          <p style={{ textAlign: 'center', color: '#777' }}>Loading your notes...</p>
        ) : notes.length === 0 ? (
          <div className="empty-notes">No notes created yet. Add your first note above!</div>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
