import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFavorites } from './FavoritesContext';
import { authService } from '../authentication/auth';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Travel = () => {
  const { favorites } = useFavorites(); // favorites = array of destination objects
  const user = authService.getCurrentUser();
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [saving, setSaving] = useState(false);

  const toggleDest = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const saveTrip = async () => {
    if (!user) {
      alert('Please login to save a trip.');
      return;
    }
    if (!name || !start || !end || selected.size === 0) {
      alert('Add trip name, dates, and at least one destination.');
      return;
    }
    setSaving(true);
    try {
      const chosen = favorites.filter((d) => selected.has(d.id));
      await addDoc(collection(db, 'itineraries', user.uid, 'trips'), {
        name,
        startDate: start,
        endDate: end,
        destinations: chosen.map((d) => ({ id: d.id, name: d.name, image: d.image })),
        createdAt: serverTimestamp()
      });
      setName('');
      setStart('');
      setEnd('');
      setSelected(new Set());
      alert('Trip saved!');
    } catch (e) {
      console.error(e);
      alert('Failed to save trip.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="content-section">
      <h1>Travel</h1>
      <p>Plan your next trip using your favorite destinations.</p>

      <div className="mb-4">
        <h5>Trip details</h5>
        <input
          type="text"
          placeholder="Trip name (e.g., Monsoon in Kerala)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
        />
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>

      <div className="mb-3">
        <h5>Select from your Favorites</h5>
        {favorites.length === 0 ? (
          <p>Add some favorites first from the home page.</p>
        ) : (
          <div className="row">
            {favorites.map((d) => (
              <div key={d.id} className="col-md-4 mb-3">
                <div
                  className={`card h-100 ${selected.has(d.id) ? 'border-success' : ''}`}
                  onClick={() => toggleDest(d.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={d.image} className="card-img-top" alt={d.name} style={{ height: 160, objectFit: 'cover' }} />
                  <div className="card-body">
                    <h6 className="card-title">{d.name}</h6>
                    <small>{d.bestTime || 'Anytime'}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="btn btn-primary" onClick={saveTrip} disabled={saving}>
        {saving ? 'Saving...' : 'Save Trip'}
      </button>
    </div>
  );
};

export default Travel;