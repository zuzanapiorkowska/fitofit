import { IStatsResponse } from "../interfaces/Statistics";
import { IWorkout } from "../interfaces/Workout";

export class MockRequest {
  sendPreviousWorkoutsRequest(userId: string): IWorkout[] {
    const answer = [
      {
        userId: "pies",
        workoutId: "psitrening1",
        date: "2022-04-10",
        parts: [
          {
            discipline: "running",
            distanceInMeters: 5000,
            durationInSeconds: 439434,
          },
        ],
        notes: "Ale się zmęczyłem, ojojoj",
      },
      {
        userId: "pies",
        workoutId: "psitrening2",
        date: "2022-04-11",
        parts: [
          {
            discipline: "swimming",
            distanceInMeters: 2000,
            durationInSeconds: 559434,
          },
          {
            discipline: "cycling",
            distanceInMeters: 7000,
            durationInSeconds: 1639434,
          },
        ],
        notes: "Na co mi to było?",
      },
    ];
    return answer;
  }
  sendWorkoutRequest(workoutId: string): IWorkout {
    const answer = {
      userId: "pies",
      workoutId: "psitrening2",
      date: "2022-04-11",
      parts: [
        {
          discipline: "swimming",
          distanceInMeters: 2000,
          durationInSeconds: 3666,
        },
        {
          discipline: "cycling",
          distanceInMeters: 7000,
          durationInSeconds: 9544,
        },
      ],
      notes: "Na co mi to było?",
    };
    return answer;
  }

  sendStatisticsRequest(userId: string): IStatsResponse {
    const statistics = {
      topWorkouts: [
        {
          discipline: "cycling",
          speed: 8,
          distance: 5000,
          duration: 36000,
        },
        {
          discipline: "running",
          speed: 6,
          distance: 4000,
          duration: 76000,
        },
        {
          discipline: "swimming",
          speed: 7,
          distance: 2000,
          duration: 16000,
        },
      ],
      avgWorkouts: [
        {
          discipline: "cycling",
          speed: 2,
          distance: 4000,
          duration: 26000,
        },
        {
          discipline: "running",
          speed: 3,
          distance: 1000,
          duration: 96000,
        },
        {
          discipline: "swimming",
          speed: 1,
          distance: 1000,
          duration: 2600,
        },
      ],
      totalWorkouts: [
        {
          discipline: "cycling",
          distance: 4000,
          duration: 2330,
          workoutsCount: 2,
        },
        {
          discipline: "running",
          distance: 2300,
          duration: 2230,
          workoutsCount: 10,
        },
        {
          discipline: "swimming",
          distance: 200,
          duration: 2300,
          workoutsCount: 4,
        },
      ],
    };
    return statistics;
  }
}
