import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";
import produce from "immer";

interface DurationInputProps {
  register: UseFormRegister<NewWorkoutRequest>;
  errors: any;
  idx: number;
  setValue(name: string, value: number): void;
}

export function DurationInput({
  register,
  errors,
  idx,
  setValue,
}: DurationInputProps) {
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sum = duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
  useEffect(() => {
    setValue(`parts.${idx}.durationInSeconds`, sum);
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
        />
        <span>min</span>
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
          }}
        />
        <span>sec</span>
        <input hidden {...register(`parts.${idx}.durationInSeconds`)} />
      </div>
      {errors.parts &&
        errors.parts[idx] &&
        errors.parts[idx].durationInSeconds && <p>Enter the duration!</p>}
    </>
  );
}
