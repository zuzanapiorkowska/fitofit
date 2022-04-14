import { useFormContext, UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface DisciplineProps {
  idx: number;
  discipline: string;
}

export function Discipline({ idx, discipline }: DisciplineProps) {
  const { register } = useFormContext();
  return (
    <>
      <input hidden {...register(`userId`)} value="piesId" />
      <p className="discipline">{discipline.toUpperCase()}</p>
      <input
        hidden
        {...register(`parts.${idx}.discipline`)}
        value={discipline}
      />
    </>
  );
}
