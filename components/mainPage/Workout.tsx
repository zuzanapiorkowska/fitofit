import { useState } from "react";
import { IWorkout } from "../../interfaces/Workout";

interface WorkoutProps {
  workout: IWorkout;
  onRemoveClick(): void;
}
export function Workout({ workout, onRemoveClick }: WorkoutProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <div>
      <div className="workout-title">
          <a className="workout-title__edit" href={`/edit/${workout.workoutId}`}><img src="/edit.png"/></a>
        <p className="workout-title__date" onClick={() => setShowDetails(!showDetails)}>{workout.date}</p>
        <img src="/trash.png" onClick={() => onRemoveClick()} className="workout-title__remove"/>
      </div>
      <div className={showDetails ? "ok" : "hidden"}>
        {workout.parts.map((part, idx) => {
          return (
            <div key={idx}>
              <p>{part.discipline}</p>
              <p>{part.distanceInMeters}</p>
              <p>{part.durationInSeconds}</p>
            </div>
          );
        })}
        <div>{workout.notes}</div>
      </div>
    </div>
  );
}
