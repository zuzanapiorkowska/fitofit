export interface IStatsRequest {
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export interface IWorkoutStats {
  speed: number;
  distance: number;
  duration: number;
}
export interface ITotalWorkoutStats {
  distance: number;
  duration: number;
  workoutsCount: number;
}

export interface IStatsResponse {
  cycling: {
    topWorkout: IWorkoutStats; //dane dla najlepszego treningu danej dyscypliny
    avgOfWorkouts: IWorkoutStats; //średnie wartości dla sumy wszystkich treningów danej dyscypliny
    totalWorkouts: ITotalWorkoutStats; //suma distance i duration (tutaj pomijamy speed)
  },
  running: {
    topWorkout: IWorkoutStats;
    avgOfWorkouts: IWorkoutStats;
    totalWorkouts: ITotalWorkoutStats;
  },
  swimming: {
    topWorkout: IWorkoutStats;
    avgOfWorkouts: IWorkoutStats;
    totalWorkouts: ITotalWorkoutStats;
  }
}
