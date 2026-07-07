import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchApi('teams').then((records) => {
      if (isMounted) {
        setTeams(records);
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
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.id} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name || 'Team'}</h5>
                <p className="card-text mb-1"><strong>Captain:</strong> {team.captain || 'N/A'}</p>
                <p className="card-text mb-1"><strong>Goal:</strong> {team.goal || 'N/A'}</p>
                <p className="card-text"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.join(', ') : 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
