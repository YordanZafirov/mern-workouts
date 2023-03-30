import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

const initialState = {
  workouts: [],
};

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { ...state, workouts: action.payload };
    case 'ADD_WORKOUT':
      return { ...state, workouts: [...state.workouts, action.payload] };
    case 'UPDATE_WORKOUT':
      const updatedWorkout = action.payload;
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          if (workout._id === updatedWorkout._id) {
            return updatedWorkout;
          }
          return workout;
        })
      };
    case 'DELETE_WORKOUT':
      const deletedWorkoutId = action.payload._id;
      return {
        ...state,
        workouts: state.workouts.filter((workout) => workout._id !== deletedWorkoutId)
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  const setWorkouts = (workouts) => {
    dispatch({ type: 'SET_WORKOUTS', payload: workouts });
  }

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch, setWorkouts }}>
      {children}
    </WorkoutsContext.Provider>
  )
}