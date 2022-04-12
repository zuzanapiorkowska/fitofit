import { DateInput } from "../components/addWorkout/DateInput";
import { DistanceInput } from "../components/addWorkout/DistanceInput";
import { DurationInput } from "../components/addWorkout/DurationInput";
import { WorkoutTypeSelect } from "../components/addWorkout/WorkoutTypeSelect";

export default function addWorkout() {
  return (
    <div className="container">
      <h1>Mój ostatni trening</h1>
      <form>
        <DateInput />
        <WorkoutTypeSelect />
        <DurationInput />
        <DistanceInput />
        <button>Dodaj trening</button>
      </form>
    </div>
  );
}
