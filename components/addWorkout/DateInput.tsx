import { useEffect } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface DateInputProps {
  dateToEdit?: string;
}

export function DateInput({ dateToEdit}: DateInputProps) {
 const { register, formState: {errors, isSubmitted}, setValue } = useFormContext();

 useEffect(() => {
  console.log("ok");
  setValue(`date`, dateToEdit, { shouldValidate: true });
}, [dateToEdit]);

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
