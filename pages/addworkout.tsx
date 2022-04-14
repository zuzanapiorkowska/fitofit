import { DateInput } from "../components/addWorkout/DateInput";
import { DistanceInput } from "../components/addWorkout/DistanceInput";
import { DurationInput } from "../components/addWorkout/DurationInput";
import { WorkoutTypeSelect } from "../components/addWorkout/WorkoutTypeSelect";
import { NewWorkoutRequest } from "../validation/NewWorkoutRequest";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IPartialWorkout } from "../interfaces/Workout";
import produce from "immer";
import { Discipline } from "../components/addWorkout/Discipline";

export default function addWorkout() {
  const resolver = classValidatorResolver(NewWorkoutRequest);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<NewWorkoutRequest>({ resolver });
  async function onSubmit(data: any) {
    const request = new SendRequest();
    const response = request.sendEditWorkoutRequest(data);
    console.log(data);
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
        <h1 className="add-workout__title">TRAINING DETAILS</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DateInput register={register} errors={errors} />
          <div className="add-part">
            <WorkoutTypeSelect
              onChange={selection => setNextDiscipline(selection)}
            />
            <button className="add-part__button" onClick={() => addNewPart()}>
              +
            </button>
          </div>
          <div className="parts">
            {partialWorkouts.map((part, idx) => {
              if (part.displayed)
                return (
                  <div key={idx} className="part">
                    <Discipline
                      register={register}
                      idx={idx}
                      discipline={part.discipline}
                    />
                    <DistanceInput
                      register={register}
                      errors={errors}
                      idx={idx}
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
          </div>
          <div className="input-area">
            <label className="label">Notes: </label>
            <textarea {...register("notes", {})} />
          </div>{" "}
          <input type="submit" className="submit-button" value="SUBMIT" />
        </form>
      </div>
    </div>
  );
}
