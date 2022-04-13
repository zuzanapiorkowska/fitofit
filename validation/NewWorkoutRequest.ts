import {
  Min,
  Max,
  IsInt,
  IsString,
  ValidateNested,
  IsIn,
  IsDateString,
  IsOptional,
  IsPositive,
} from "class-validator";
import { Discipline } from "../interfaces/Workout";
import { Type } from "class-transformer";
import "reflect-metadata";

export class PartialWorkout {
  @IsIn(["cycling", "running", "swimming"])
  discipline!: Discipline;

  @IsInt()
  @IsPositive()
  distanceInMeters!: number;

  @IsInt()
  @IsPositive()
  durationInSeconds!: number;
}

export class NewWorkoutRequest {
  @IsString()
  userId!: string;

  @IsDateString()
  date!: string;

  @ValidateNested({ each: true })
  @Type(() => PartialWorkout)
  parts!: PartialWorkout[];

  @IsString()
  @IsOptional()
  notes?: string;
}
