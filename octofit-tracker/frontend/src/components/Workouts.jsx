import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchApi('workouts').then((records) => {
      if (isMounted) {
        setWorkouts(records);
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
      <h2 className="mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{workout.title || 'Workout'}</h5>
                <p className="card-text mb-1"><strong>Difficulty:</strong> {workout.difficulty || 'N/A'}</p>
                <p className="card-text mb-1"><strong>Focus:</strong> {workout.focus || 'N/A'}</p>
                <p className="card-text"><strong>Duration:</strong> {workout.durationMinutes || workout.duration || 'N/A'} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
