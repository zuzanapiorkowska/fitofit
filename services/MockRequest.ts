import { IWorkout } from "../interfaces/Workout";

export class MockRequest {
  sendPreviousWorkoutsRequest(userId: string): IWorkout[] {
    const answer = [
      {
        userId: "pies",
        workoutId: "psitrening1",
        date: "2022-04-10",
        parts: [{
          discipline: "running",
          distanceInMeters: 5000,
          durationInSeconds: 439434,
        }],
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
  sendWorkoutsRequest(workoutId: string): IWorkout {
    const answer =
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
    }
    return answer;
  }
}
