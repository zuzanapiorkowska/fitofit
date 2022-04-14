import { useState } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface DistanceInputProps {
  idx: number;
  distanceToEdit?: number;
}

export function DistanceInput({ idx, distanceToEdit }: DistanceInputProps) {
  const { register, formState: {errors} } = useFormContext();

  return (<>
    <div className="input-area">
      <label htmlFor="distance" className="label">
        Distance in km:{" "}
      </label>
      <input
        {...register(`parts.${idx}.distanceInMeters`, { setValueAs: v => +v*1000 })}
        type="number"
        step={0.001}
        className="input distance-input"
        defaultValue={distanceToEdit && distanceToEdit/1000}
      />
     
    </div>
    {errors.parts && errors.parts[idx] && errors.parts[idx].distanceInMeters && <p className="error">Enter the distance!</p>}
  </>);
}
