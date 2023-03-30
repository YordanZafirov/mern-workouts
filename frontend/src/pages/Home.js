import { useEffect, useContext } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from '../hooks/useAuthContext';

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { WorkoutsContext } from "../context/WorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { setWorkouts } = useContext(WorkoutsContext);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts/',{
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json);
      }
    }
    if(user){
      fetchWorkouts()
    }
  }, [setWorkouts, dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home