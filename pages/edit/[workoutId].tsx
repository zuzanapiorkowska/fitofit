import { DateInput } from "../../components/addWorkout/DateInput";
import { DistanceInput } from "../../components/addWorkout/DistanceInput";
import { DurationInput } from "../../components/addWorkout/DurationInput";
import { WorkoutTypeSelect } from "../../components/addWorkout/WorkoutTypeSelect";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  IPartialWorkout,
  IStandardResponse,
  IWorkout,
} from "../../interfaces/Workout";
import produce from "immer";
import { useRouter } from "next/router";
import { MockRequest } from "../../services/MockRequest";
import { Discipline } from "../../components/addWorkout/Discipline";
import { SendRequest } from "../../services/SendRequest";

export default function addWorkout() {
  const [workoutToEdit, setWorkoutToEdit] = useState<IWorkout>();
  const [nextDiscipline, setNextDiscipline] = useState<string>("cycling");
  const [partialWorkouts, setPartialWorkouts] = useState([
    { discipline: "cycling", displayed: false },
    { discipline: "running", displayed: false },
    { discipline: "swimming", displayed: false },
  ]);
  const router = useRouter();
  const workoutId = router.query.workoutId as unknown as string | undefined;

  useEffect(() => {
    const workout = new MockRequest().sendWorkoutsRequest("piesId");
    // console.log("tried to get workout to edit")
    // new SendRequest()
    // .getTraining(workoutId)
    // .then((workoutResponse: IWorkout) => {
    //   setWorkoutToEdit(workoutResponse);
    //   })
    setWorkoutToEdit(workout);
    workout.parts.forEach(part => {
      setPartialWorkouts(
        produce(draft => {
          draft.forEach(partType => {
            if (partType.discipline === part.discipline)
              partType.displayed = true;
          });
        })
      );
    });
  }, []);

  const resolver = classValidatorResolver(NewWorkoutRequest);
  const methods = useForm<NewWorkoutRequest>({
    resolver,
    defaultValues: workoutToEdit,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
    clearErrors,
  } = methods;

  async function onSubmit(workout: IWorkout) {
    console.log(workout);
    // console.log("tried to send request");
    // new SendRequest().editTraining(workout).then((res: IStandardResponse) => {
    //   console.log("Message: ", res.message);
    // });
  }
  console.log("Errors: ", errors);
  function addDiscipline() {
    setWorkoutToEdit(
      produce(draft => {
        if (
          draft?.parts.length === 2 &&
          draft?.parts[0].discipline !== nextDiscipline &&
          draft?.parts[1].discipline !== nextDiscipline
        ) {
          draft?.parts.push({
            discipline: nextDiscipline,
            distanceInMeters: 0,
            durationInSeconds: 0,
          });
        }
        if (
          draft?.parts.length === 1 &&
          draft?.parts[0].discipline !== nextDiscipline
        ) {
          draft?.parts.push({
            discipline: nextDiscipline,
            distanceInMeters: 0,
            durationInSeconds: 0,
          });
        }
      })
    );
  }
  return (
    <div className="container">
      <img src="/fitofitlogo.png" className="logo min" />
      <div className="add-workout">
        <h1 className="add-workout__title">EDIT WORKOUT</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DateInput
              dateToEdit={workoutToEdit?.date}
            />
            <div className="add-part">
              <WorkoutTypeSelect
                onChange={selection => setNextDiscipline(selection)}
              />
              <button
                className="add-part__button"
                onClick={() => addDiscipline()}
              >
                +
              </button>
            </div>
            <div className="parts">
              {workoutToEdit?.parts.map((part, idx) => {
                return (
                  <div key={idx} className="part">
                    <Discipline
                      idx={idx}
                      discipline={part.discipline}
                    />
                    <DistanceInput
                      idx={idx}
                    />
                    <DurationInput
                      idx={idx}
                    />
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
