import { useEffect, useContext } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { WorkoutsContext } from "../context/WorkoutsContext";

const Home = () => {
  const { workouts } = useWorkoutsContext();
  const { setWorkouts } = useContext(WorkoutsContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts/')
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json);
      }
    }

    fetchWorkouts()
  }, [setWorkouts])

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