import { DateInput } from "../../components/addWorkout/DateInput";
import { DistanceInput } from "../../components/addWorkout/DistanceInput";
import { DurationInput } from "../../components/addWorkout/DurationInput";
import { WorkoutTypeSelect } from "../../components/addWorkout/WorkoutTypeSelect";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IPartialWorkout, IWorkout } from "../../interfaces/Workout";
import produce from "immer";
import { useRouter } from "next/router";
import { MockRequest } from "../../services/MockRequest";
import { Discipline } from "../../components/addWorkout/Discipline";

export default function addWorkout() {
  const [workoutToEdit, setWorkoutToEdit] = useState<IWorkout>();
  const [nextDiscipline, setNextDiscipline] = useState<string>("cycling");
  const [partialWorkouts, setPartialWorkouts] = useState([
    { discipline: "cycling", displayed: false },
    { discipline: "running", displayed: false },
    { discipline: "swimming", displayed: false },
  ]);

  useEffect(() => {
    const workout = new MockRequest().sendWorkoutsRequest("piesId");
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
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<NewWorkoutRequest>({
    resolver,
    defaultValues: workoutToEdit,
  });
  const onSubmit = (data: any) => console.log(data);

  const router = useRouter();
  const workoutId = router.query.workoutId as unknown as string | undefined;
  console.log(workoutId);
  console.log("Errors: ", errors);
  function isNotEqual(a: string, b: string): boolean {
    return a === b;
  }
  function addDiscipline() {
    setWorkoutToEdit(
      produce(draft => {
        //jesli nie ma tej dyscypliny, to dodaj pusty
        // if(nextDiscipline)
        //wysłanie na podmiankę
        //Labelki: distance in km, duration in h min sec
          draft?.parts.push({
            discipline: nextDiscipline,
            distanceInMeters: 0,
            durationInSeconds: 0,
          });
      })
    );
  }
  return (
    <div className="container">
      <div className="add-workout">
        <h1 className="add-workout__title">EDIT TRAINING</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DateInput
            register={register}
            errors={errors}
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
          {workoutToEdit?.parts.map((part, idx) => {
            return (
              <div key={idx} className="part">
                <Discipline register={register} idx={idx} discipline={part.discipline} />
                <DistanceInput
                  register={register}
                  errors={errors}
                  idx={idx}
                  distanceToEdit={
                    workoutToEdit &&
                    workoutToEdit.parts &&
                    workoutToEdit.parts[idx] &&
                    workoutToEdit.parts[idx].distanceInMeters
                  }
                />
                <DurationInput
                  register={register}
                  errors={errors}
                  idx={idx}
                  setValue={setValue}
                />
              </div>
            );
          })}
          <div className="input-area">
            <label className="label">Notes: </label>
            <textarea {...register("notes", {})} />
          </div>{" "}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
