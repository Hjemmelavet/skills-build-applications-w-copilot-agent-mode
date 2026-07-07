import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchApi('leaderboard').then((records) => {
      if (isMounted) {
        setEntries(records);
      }
    }).catch((err) => {
      if (isMounted) {
        setError(err.message);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{entry.user || entry.name || 'Unknown'}</span>
            <span className="badge bg-primary rounded-pill">{entry.score || entry.points || 0}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
