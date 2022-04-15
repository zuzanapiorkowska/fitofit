import produce from "immer";
import moment, { duration } from "moment";
import { useEffect, useState } from "react";
import { IStatsResponse, IWorkoutStats } from "../../interfaces/Statistics";
import { MockRequest } from "../../services/MockRequest";

interface StatisticsProps {
  userId?: string;
}

export function Statistics({ userId }: StatisticsProps) {
  const stats = new MockRequest().sendStatisticsRequest(userId || "");

  const [mainStats, setMainStats] = useState({
    totalCount:
      stats.cycling.totalWorkouts.workoutsCount +
      stats.running.totalWorkouts.workoutsCount +
      stats.swimming.totalWorkouts.workoutsCount,
    totalDuration:
      stats.cycling.totalWorkouts.duration +
      stats.running.totalWorkouts.duration +
      stats.swimming.totalWorkouts.duration,
    totalDistance:
      (stats.cycling.totalWorkouts.distance +
        stats.running.totalWorkouts.distance +
        stats.swimming.totalWorkouts.distance) /
      1000,
  });

  const [activeBtn, setActiveBtn] = useState([
    { name: "all", active: true },
    { name: "cycling", active: false },
    { name: "running", active: false },
    { name: "swimming", active: false },
  ]);

  function showStats(discipline: string) {
    setActiveBtn(
      produce(draft => {
        draft.forEach(button => {
          if (button.name === discipline) {
            button.active = true;
          } else {
            button.active = false;
          }
        });
      })
    );
    if (discipline === "all") {
      setMainStats({
        totalCount:
          stats.cycling.totalWorkouts.workoutsCount +
          stats.running.totalWorkouts.workoutsCount +
          stats.swimming.totalWorkouts.workoutsCount,
        totalDuration:
          stats.cycling.totalWorkouts.duration +
          stats.running.totalWorkouts.duration +
          stats.swimming.totalWorkouts.duration,
        totalDistance:
          (stats.cycling.totalWorkouts.distance +
            stats.running.totalWorkouts.distance +
            stats.swimming.totalWorkouts.distance) /
          1000,
      });
    }
    if (discipline === "cycling") {
      setMainStats({
        totalCount: stats.cycling.totalWorkouts.workoutsCount,
        totalDuration: stats.cycling.totalWorkouts.duration,
        totalDistance: stats.cycling.totalWorkouts.distance / 1000,
      });
    }
    if (discipline === "running") {
      setMainStats({
        totalCount: stats.running.totalWorkouts.workoutsCount,
        totalDuration: stats.running.totalWorkouts.duration,
        totalDistance: stats.running.totalWorkouts.distance / 1000,
      });
    }
    if (discipline === "swimming") {
      setMainStats({
        totalCount: stats.swimming.totalWorkouts.workoutsCount,
        totalDuration: stats.swimming.totalWorkouts.duration,
        totalDistance: stats.swimming.totalWorkouts.distance / 1000,
      });
    }
  }
  let time = moment.utc(mainStats.totalDuration * 1000).format("HH:mm:ss");
  let duration = {
    hours: time.slice(0, 2),
    minutes: time.slice(3, 5),
    seconds: time.slice(6, 8),
  };
  useEffect(() => {
    time = moment.utc(mainStats.totalDuration * 1000).format("HH:mm:ss");
    duration = {
      hours: time.slice(0, 2),
      minutes: time.slice(3, 5),
      seconds: time.slice(6, 8),
    };
  }, [mainStats]);

  return (
    <div className="my-stats">
      <p className="title">MY STATS</p>
      <div className="my-stats__total">
        <span className="my-stats__total__title">
          ALL WORKOUTS <br /> <hr />{" "}
          <span className="my-stats__total__value">{mainStats.totalCount}</span>
        </span>
        <span className="my-stats__total__title">
          {" "}
          TOTAL DURATION <br />
          <hr />
          <span className="my-stats__total__value">
            {duration.hours}:{duration.minutes}:{duration.seconds}
          </span>
        </span>
        <span className="my-stats__total__title">
          {" "}
          TOTAL DISTANCE <br />
          <hr />
          <span className="my-stats__total__value">{mainStats.totalDistance}</span>
        </span>
      </div>
      <div className="stats-menu">
        <img
          className={activeBtn[0].active ? "stats-menu__img clicked" : "stats-menu__img"}
          src="/all.png"
          onClick={() => showStats("all")}
        />
        <img
          className={activeBtn[1].active ? "stats-menu__img clicked" : "stats-menu__img"}
          src="/bike.png"
          onClick={() => showStats("cycling")}
        />
        <img
          className={activeBtn[2].active ? "stats-menu__img clicked" : "stats-menu__img"}
          src="/run.png"
          onClick={() => showStats("running")}
        />
        <img
          className={activeBtn[3].active ? "stats-menu__img clicked" : "stats-menu__img"}
          src="/swim.png"
          onClick={() => showStats("swimming")}
        />
        {/* <button className="small-button">SHOW MORE STATS</button> */}
      </div>
    </div>
  );
}
