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
 
  const time = moment.utc((durationToEdit || 0) * 1000).format("HH:mm:ss");

  const [duration, setDuration] = useState({
    hours:  +time.slice(0, 2),
    minutes: +time.slice(3, 5),
    seconds: +time.slice(6, 8),
  });

  useEffect(() => {
    console.log("ok");
    const sum = duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
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
          defaultValue={duration.hours}
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
          defaultValue={duration.minutes}
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
          defaultValue={duration.seconds}
        />
        <input defaultValue={time || 0} hidden {...register(`parts.${idx}.durationInSeconds`)} />
      </div>
      {errors.parts && errors.parts[idx] && errors.parts[idx].durationInSeconds && (
        <p className="error">Enter the duration!</p>
      )}
    </>
  );
}
