import moment from "moment";
import Link from "next/link";
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
          <Link href={`/edit/${workout.id}`}><span className="workout-title__edit"><img src="/edit.png"/></span></Link>
        <p className="workout-title__date" onClick={() => setShowDetails(!showDetails)}>{workout.date}</p>
        <img src="/trash.png" onClick={() => onRemoveClick()} className="workout-title__remove"/>
      </div>
      <div className={showDetails ? "ok" : "hidden"}>
        {workout.parts.map((part, idx) => {
          const time = moment.utc(part.durationInSeconds * 1000).format("HH:mm:ss");
          const duration = {
            hours: time.slice(0, 2),
            minutes: time.slice(3, 5),
            seconds: time.slice(6, 8),
          };
          return (
            <div key={idx} className="details">
              <p className="details__discipline">{part.discipline.toUpperCase()}</p>
              <p className="details__text">Distance: <span className="details__value">{part.distanceInMeters/1000}</span> km</p>
              <p className="details__text">Duration: <span className="details__value">{duration.hours}</span> : <span className="details__value">{duration.minutes}</span> : <span className="details__value">{duration.seconds}</span></p>
            </div>
          );
        })}
        <div className="details details__notes">Notes:<span className="notes"> {workout.notes}</span></div>
      </div>
    </div>
  );
}
