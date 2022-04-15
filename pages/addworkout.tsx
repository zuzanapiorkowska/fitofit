import { DateInput } from "../components/addWorkout/DateInput";
import { DistanceInput } from "../components/addWorkout/DistanceInput";
import { DurationInput } from "../components/addWorkout/DurationInput";
import { WorkoutTypeSelect } from "../components/addWorkout/WorkoutTypeSelect";
import { NewWorkoutRequest } from "../validation/NewWorkoutRequest";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { IWorkout } from "../interfaces/Workout";
import produce from "immer";
import { Discipline } from "../components/addWorkout/Discipline";
import { SendRequest } from "../services/SendRequest";

export default function addWorkout() {
  const resolver = classValidatorResolver(NewWorkoutRequest);

  const methods = useForm<NewWorkoutRequest>({ resolver });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
    clearErrors,
  } = methods;

  async function onSubmit(workout: IWorkout) {
    console.log("tried to send request");
    location.replace("/")
    new SendRequest()
    .addNewTraining(workout)
    .then((res: IWorkout) => {
          console.log("New workout Id: ", res.id);
      })
  }

  console.log("Errors: ", errors);

  const [partialWorkouts, setPartialWorkouts] = useState([
    { discipline: "cycling", displayed: false },
    { discipline: "running", displayed: false },
    { discipline: "swimming", displayed: false },
  ]);

  const [nextDiscipline, setNextDiscipline] = useState<string>("cycling");
  function addNewPart() {
    setPartialWorkouts(
      produce(draft => {
        draft.forEach(draft => {
          if (draft.discipline === nextDiscipline) draft.displayed = true;
        });
      })
    );
  }
  return (
    <div className="container">
      <img src="/fitofitlogo.png" className="logo min" />
      <div className="add-workout">
        <h1 className="add-workout__title">WORKOUT DETAILS</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DateInput />
            <div className="add-part">
              <WorkoutTypeSelect onChange={selection => setNextDiscipline(selection)} />
              <button
                className="add-part__button"
                onClick={() => {
                  addNewPart();
                  setTimeout(() => {
                    clearErrors();
                  }, 0);
                }}>
                +
              </button>
            </div>
            <div className="parts">
              {partialWorkouts.map((part, idx) => {
                if (part.displayed)
                  return (
                    <div key={idx} className="part">
                      <Discipline idx={idx} discipline={part.discipline} />
                      <DistanceInput idx={idx} />
                      <DurationInput idx={idx} />
                    </div>
                  );
              })}
            </div>
            <div className="input-area">
              <label className="label">Notes: </label>
              <textarea {...register("notes", {})} />
            </div>{" "}
            <input type="submit" className="submit-button" value="SUBMIT" />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
