import axios from "axios";
import { IWorkout, IStandardResponse} from "../interfaces/Workout";

export class SendRequest {
  async getAllTrainings(): Promise<IWorkout[]> {
    const url = "/api/training";
    try {
      console.log("tried to get all trainings");
      const response = await axios.get(url);
      const allWorkouts: IWorkout[] = response.data;
      return allWorkouts;
    } catch (err: any) {
      throw new Error(err.message + `Cannot connect to ${url}`);
    }
  }

  async getTraining(workoutId: string): Promise<IWorkout> {
    const url = "/api/training";
    try {
      console.log("tried to get a training");
      const response = await axios.get(`${url}/${workoutId}`);
      const workout: IWorkout = response.data;
      return workout;
    } catch (err: any) {
      throw new Error(err.message + `Cannot connect to ${url}`);
    }
  }

  async addNewTraining(workout: IWorkout): Promise<IWorkout> {
    const url = "/api/training";
    try {
      console.log("tried to send new training");
      const response = await axios.post(url, { workout: workout });
      const ConfirmationAnswer: IWorkout = response.data;
      return ConfirmationAnswer;
    } catch (err:any) {
      throw new Error(err.message + `Cannot connect to ${url}`);
    }
  }

  async editTraining(workout: IWorkout): Promise<IStandardResponse> {
    const url = "/api/training";
    try {
      console.log("tried to update training");
      const response = await axios.put(url, { workout: workout });
      const ConfirmationAnswer: IStandardResponse = response.data;
      return ConfirmationAnswer;
    } catch (err:any) {
      throw new Error(err.message + `Cannot connect to ${url}`);
    }
  }

  async deleteTraining(workoutId: string): Promise<IStandardResponse> {
    const url = "/api/training";
    try {
      console.log("tried to delete training");
      const response = await axios.delete(`${url}/${workout}`);
      const ConfirmationAnswer: IStandardResponse = response.data;
      return ConfirmationAnswer;
    } catch (err: any) {
      throw new Error(err.message + `Cannot connect to ${url}`);
    }
  }
}
