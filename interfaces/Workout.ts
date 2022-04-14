export type Discipline = "cycling" | "swimming" | "running";
export type GoalType = "distance" | "workoutCount";
export type Gender = "male" | "female" | "other" | "prefer not to say";

export interface IPartialWorkout {
  discipline: Discipline;
  distanceInMeters: number;
  durationInSeconds: number;
  id?: number;
}

export interface IWorkout {
  userId?: string;
  id?: string;
  date: string;
  parts: IPartialWorkout[];
  notes?: string;
}

export interface IUserLogin {
  userId: string;
  username: string;
  password: string;
}

export interface IUserDetails {
  userId: string;
  username: string;
  gender?: Gender;
  about?: string;
  avatar?: string;
  goals?: IGoal[];
  workouts?: IWorkout[];
}

export interface IGoal {
  userId: string;
  goalId: string;
  type: GoalType;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  goal: number;
  note?: string;
}

export interface IStandardResponse {
  statusCode: number;
  message: string;
  error?: string;
} 
