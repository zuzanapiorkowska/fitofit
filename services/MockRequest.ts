import { IStatsResponse } from "../interfaces/Statistics";
import { IWorkout } from "../interfaces/Workout";

export class MockRequest {
  sendPreviousWorkoutsRequest(userId: string) {
    const answer = [
      {
        userId: "pies",
        id: "psitrening1",
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
        userId: "pies2",
        id: "psitrening2",
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
  sendWorkoutRequest(workoutId: string) {
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

  sendStatisticsRequest(userId: string) {
    const statistics = {
      cycling: {
        topWorkout: {
          speed: 8,
          distance: 5000,
          duration: 36000,
        },
        avgOfWorkouts: {
          speed: 2,
          distance: 4000,
          duration: 26000,
        },
        totalWorkouts: {
          distance: 200,
          duration: 2300,
          workoutsCount: 4,
        },
      },
      running: {
        topWorkout: {
          speed: 8,
          distance: 5000,
          duration: 36000,
        },
        avgOfWorkouts: {
          speed: 2,
          distance: 4000,
          duration: 26000,
        },
        totalWorkouts: {
          distance: 700,
          duration: 8300,
          workoutsCount: 23,
        },
      },
      swimming: {
        topWorkout: {
          speed: 8,
          distance: 5000,
          duration: 36000,
        },
        avgOfWorkouts: {
          speed: 2,
          distance: 4000,
          duration: 26000,
        },
        totalWorkouts: {
          distance: 400,
          duration: 1300,
          workoutsCount: 4,
        },
      },
    };
    return statistics;
  }
}
