import { useEffect, useState } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";
import produce from "immer";
import moment from "moment";

interface DurationInputProps {
  idx: number;
  durationToEdit?: number;
}

export function DurationInput({ idx, durationToEdit }: DurationInputProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const time = moment.utc(durationToEdit * 1000).format("HH:mm:ss");

  const previousDuration = {
    hours: time.slice(0, 2),
    minutes: time.slice(3, 5),
    seconds: time.slice(6, 8),
  };

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
          placeholder="hr"
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
        <span className="time-unit">:</span>
        <input
          name="minutes"
          type="number"
          placeholder="min"
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
        <span className="time-unit">:</span>
        <input
          name="seconds"
          type="number"
          placeholder="sec"
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
        <input
          defaultValue={time || 0}
          hidden
          {...register(`parts.${idx}.durationInSeconds`)}
        />
      </div>
      {errors.parts &&
        errors.parts[idx] &&
        errors.parts[idx].durationInSeconds && (
          <p className="error">Enter the duration!</p>
        )}
    </>
  );
}
