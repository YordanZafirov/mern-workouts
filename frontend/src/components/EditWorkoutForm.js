import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const EditWorkoutForm = ({ workout, setIsEditing, setWorkouts }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext()

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [error, setError] = useState(null);

const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!user) {
    setError('You must be logged in')
    return
  }

  const workoutUpdate = { title, load, reps };
  const response = await fetch(`https://workouts-api-1tq5.onrender.com/api/workouts/${workout._id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    },
    body: JSON.stringify(workoutUpdate)
  });
  const json = await response.json();

  if (!response.ok) {
    setError(json.error);
  } else {
    setError(null);
    dispatch({ type: 'UPDATE_WORKOUT', payload: json });
    setWorkouts(prev => prev.map((w) => w._id === json._id ? json : w)); // update workouts state
    setIsEditing(false);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" 
        value={title} 
        onChange={(event) => setTitle(event.target.value)} 
        />
      </label>
      <br />
      <label>
        Load (kg):
        <input type="number" 
        value={load} 
        onChange={(event) => setLoad(event.target.value)} 
        />
      </label>
      <br />
      <label>
        Number of reps:
        <input type="number" 
        value={reps} 
        onChange={(event) => setReps(event.target.value)} 
        />
      </label>
      <br />
      <button type="submit">Update</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EditWorkoutForm;