import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface DistanceInputProps {
  register: UseFormRegister<NewWorkoutRequest>;
  errors: any;
  idx: number;
  distanceToEdit?: number;
}

export function DistanceInput({ register, errors, idx, distanceToEdit }: DistanceInputProps) {
  const [distance, setDistance] = useState<number>();

  return (<>
    <div className="input-area">
      <label htmlFor="distance" className="label">
        Distance in km:{" "}
      </label>
      <input
        {...register(`parts.${idx}.distanceInMeters`, { setValueAs: v => +v })}
        type="number"
        step={0.001}
        className="input distance-input"
        defaultValue={distanceToEdit}
      />
     
    </div>
    {errors.parts && errors.parts[idx] && errors.parts[idx].distanceInMeters && <p className="error">Enter the distance!</p>}
  </>);
}
