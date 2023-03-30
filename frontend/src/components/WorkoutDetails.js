import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import EditWorkoutForm from './EditWorkoutForm';
import { useAuthContext } from '../hooks/useAuthContext';


//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout, setWorkouts }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthContext()

  const handleClick = async () => {
    if(!user){
      return;
    }
    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    };
  };

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.updatedAt), {addSuffix: true})}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
      <span id='edit' className='material-symbols-outlined' onClick={handleEditClick}>edit</span>
      {isEditing && <EditWorkoutForm workout={workout} setIsEditing={setIsEditing} setWorkouts={setWorkouts}/>}
    </div>
  )
}

export default WorkoutDetails