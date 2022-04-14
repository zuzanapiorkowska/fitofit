import { UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface DateInputProps {
  register: UseFormRegister<NewWorkoutRequest>;
  errors: any;
  dateToEdit?: string;
  isSubmitted?: any;
}

export function DateInput({ register, errors, dateToEdit, isSubmitted }: DateInputProps) {
  return (
    <>
      <div className="input-area">
        <label htmlFor="date" className="label">
          Date:{" "}
        </label>
        <input
          {...register(`date`)}
          className="input"
          name="date"
          type="date"
          defaultValue={dateToEdit}
        />
      </div>
      {isSubmitted && errors.date && <p className="error">Enter the date!</p>}
    </>
  );
}
