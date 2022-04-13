import produce from "immer";
import { useEffect, useState } from "react";
import { Workout } from "../components/mainPage/Workout";
import { IWorkout } from "../interfaces/Workout";
import { MockRequest } from "../services/MockRequest";

export default function UserPage() {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  useEffect(() => {
    const previousWorkouts = new MockRequest().sendPreviousWorkoutsRequest(
      "pies"
    );
    setWorkouts(previousWorkouts);
  }, []);

  //onSubmit ma się wysyłać request
  // po co Id wymagane w IWorkout???

  function handleRemoveClick(workoutId: string) {
    setWorkouts(prevWorkouts =>
      prevWorkouts.filter(workout => {
        return workout.workoutId !== workoutId;
      })
    );
  }

  return (
    <div className="container">
      <img src="/fitofitlogo.png"className="logo"/>
      <h1>Hello, User!</h1>
      <a href="/addworkout">
        <button className="add-new-workout-button">ADD NEW WORKOUT</button>
      </a>
      <div>
        <p className="title">MY TRAININGS</p>
        {workouts.map((workout, idx) => {
          return (
            <Workout
              key={idx}
              workout={workout}
              onRemoveClick={() => handleRemoveClick(workout.workoutId)}
            />
          );
        })}
      </div>
    </div>
  );
}
