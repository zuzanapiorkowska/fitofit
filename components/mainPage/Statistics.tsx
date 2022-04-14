import { useEffect, useState } from "react";
import { IStatsResponse } from "../../interfaces/Statistics";
import { MockRequest } from "../../services/MockRequest";

interface StatisticsProps {
  userId: string;
}

export function Statistics({ userId }: StatisticsProps) {
  let statistics: IStatsResponse;
  useEffect(() => {
    const statistics = new MockRequest().sendStatisticsRequest(userId);
  });
  const [partialWorkouts, setPartialWorkouts] = useState([
    { discipline: "cycling", displayed: false },
    { discipline: "running", displayed: false },
    { discipline: "swimming", displayed: false },
  ]);
  return (
    <div>
      <p className="title">MY STATISTICS</p>
    </div>
  );
}
