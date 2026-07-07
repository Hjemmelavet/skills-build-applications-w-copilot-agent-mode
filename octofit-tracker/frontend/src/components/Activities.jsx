import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchApi('activities').then((records) => {
      if (isMounted) {
        setActivities(records);
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
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {activities.map((activity) => (
          <div key={activity._id || activity.id} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{activity.type || 'Activity'}</h5>
                <p className="card-text mb-1"><strong>User:</strong> {activity.user || 'Unknown'}</p>
                <p className="card-text mb-1"><strong>Duration:</strong> {activity.durationMinutes || activity.duration || 'N/A'} min</p>
                <p className="card-text"><strong>Calories:</strong> {activity.caloriesBurned || activity.calories || 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
