import { UseFormRegister } from "react-hook-form";
import { NewWorkoutRequest } from "../../validation/NewWorkoutRequest";

interface DisciplineProps {
  register: UseFormRegister<NewWorkoutRequest>;
  idx: number;
  discipline: string;
}

export function Discipline({ register, idx, discipline }: DisciplineProps) {
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
