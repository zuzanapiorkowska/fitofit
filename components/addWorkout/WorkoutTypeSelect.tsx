import { UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface WorkoutTypeSelectProps {
  onChange(selection: string): void;
}

export function WorkoutTypeSelect({onChange}: WorkoutTypeSelectProps) {
  return (
    <div className="input-area">
      <label htmlFor="workout-type" className="label">
        Type:
      </label>
      <select
        className="workout-type__select" onChange={(e)=>onChange(e.target.value)}
      >
        <option value="cycling">cycling</option>
        <option value="running">running</option>
        <option value="swimming">swimming</option>
      </select>
    </div>
  );
}
