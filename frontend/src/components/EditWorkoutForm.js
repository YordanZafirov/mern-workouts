import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const EditWorkoutForm = ({ workout, setIsEditing, setWorkouts }) => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  const workoutUpdate = { title, load, reps };
  const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
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