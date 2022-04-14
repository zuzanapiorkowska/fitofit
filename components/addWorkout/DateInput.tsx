import { useFormContext, UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface DateInputProps {
  dateToEdit?: string;
}

export function DateInput({ dateToEdit}: DateInputProps) {
 const { register, formState: {errors, isSubmitted} } = useFormContext();
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
