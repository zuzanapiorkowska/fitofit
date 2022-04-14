import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";
import produce from "immer";
import moment from "moment";

interface DurationInputProps {
  register: UseFormRegister<NewWorkoutRequest>;
  errors: any;
  idx: number;
  durationToEdit?: number;
  setValue(name: string, value: number, {}): void;
}

export function DurationInput({
  register,
  errors,
  idx,
  setValue,
  durationToEdit,
}: DurationInputProps) {
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const time = moment.utc(durationToEdit*1000).format('HH:mm:ss');

  const previousDuration = {
    hours: time.slice(0, 2), 
    minutes: time.slice(3, 5),
    seconds: time.slice (6, 8)
  }

  useEffect(() => {
    console.log("ok");
    const sum =
      duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
    setValue(`parts.${idx}.durationInSeconds`, sum, { shouldValidate: true });
  }, [duration]);

  return (
    <>
      <div className="input-area">
        <span className="label">Duration: </span>
        <input
          name="hours"
          type="number"
          className="input time-input"
          onChange={e => {
            const value = +e.target.value;
            setDuration(
              produce(draft => {
                draft.hours = value;
              })
            );
          }}
          defaultValue={previousDuration.hours}
        />
        <span className="time-unit">hr</span>
        <input
          name="minutes"
          type="number"
          className="input time-input"
          onChange={e => {
            const value = +e.target.value;
            setDuration(
              produce(draft => {
                draft.minutes = value;
              })
            );
          }}
          defaultValue={previousDuration.minutes}
        />
        <span className="time-unit">min</span>
        <input
          name="seconds"
          type="number"
          className="input time-input"
          onChange={e => {
            const value = +e.target.value;
            setDuration(
              produce(draft => {
                draft.seconds = value;
              })
            );
            console.log(duration);
          }}
          defaultValue={previousDuration.seconds}
        />
        <span className="time-unit">sec</span>
        <input defaultValue={time || 0} hidden {...register(`parts.${idx}.durationInSeconds`)} />

      </div>
      {errors.parts &&
        errors.parts[idx] &&
        errors.parts[idx].durationInSeconds && (
          <p className="error">Enter the duration!</p>
        )}
    </>
  );
}
