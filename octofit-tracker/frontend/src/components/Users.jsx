import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchApi('users').then((records) => {
      if (isMounted) {
        setUsers(records);
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
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id || user.id || user.username} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.fullName || user.username || 'Unknown user'}</h5>
                <p className="card-text mb-1"><strong>Email:</strong> {user.email || 'N/A'}</p>
                <p className="card-text mb-1"><strong>Fitness level:</strong> {user.fitnessLevel || 'N/A'}</p>
                <p className="card-text">{user.bio || 'No bio provided.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
