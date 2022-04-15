import produce from "immer";
import { useEffect, useState } from "react";
import { Statistics } from "../components/mainPage/Statistics";
import { Workout } from "../components/mainPage/Workout";
import { IStandardResponse, IWorkout } from "../interfaces/Workout";
import { MockRequest } from "../services/MockRequest";
import { SendRequest } from "../services/SendRequest";

export default function UserPage() {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  useEffect(() => {
    // console.log("tried to get all trainings ");
    // new SendRequest().getAllTrainings().then((workoutResponse: IWorkout[]) => {
    //   setWorkouts(workoutResponse);
    // });
    const previousWorkouts = new MockRequest().sendPreviousWorkoutsRequest("pies");
    setWorkouts(previousWorkouts);
  }, []);

  async function handleRemoveClick(workoutId: string) {
    // console.log("tried to send delete request");
    // new SendRequest()
    // .deleteTraining(workoutId)
    // .then((res: IStandardResponse) => {
    //       console.log(res.message);
    //   })
    setWorkouts(prevWorkouts =>
      prevWorkouts.filter(workout => {
        return workout.id !== workoutId;
      })
    );
  }

  return (
    <div className="container">
      <img src="/fitofitlogo.png" className="logo" />
      <h1 className="fitofit-name">FitoFit</h1>
      <h1>Hello, User!</h1>
      <a href="/addworkout">
        <button className="add-new-workout-button">ADD NEW WORKOUT</button>
      </a>
      <div>
        <p className="title">MY WORKOUTS</p>
        {workouts.map((workout, idx) => {
          return (
            <Workout
              key={idx}
              workout={workout}
              onRemoveClick={() => handleRemoveClick(workout.id)}
            />
          );
        })}
      </div>
      <Statistics userId={workouts && workouts[0] && workouts[0].userId} />
    </div>
  );
}
