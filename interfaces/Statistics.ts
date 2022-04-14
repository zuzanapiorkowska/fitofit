import { Discipline } from "./Workout";

export interface IStatsRequest {
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export interface IWorkoutStats {
  discipline: Discipline;
  speed: number;
  distance: number;
  duration: number;
}
export interface ITotalWorkoutStats {
  discipline: Discipline;
  distance: number;
  duration: number;
  workoutsCount: number;
}

export interface IStatsResponse {
    topWorkouts: IWorkoutStats[]; //dane dla najlepszego treningu danej dyscypliny - tablica wszystkihc dyscyplin
    avgWorkouts: IWorkoutStats[]; //średnie wartości dla sumy wszystkich treningów danej dyscypliny - też tablica
    totalWorkouts: ITotalWorkoutStats[]; //suma distance i duration (tutaj pomijamy speed)
}
