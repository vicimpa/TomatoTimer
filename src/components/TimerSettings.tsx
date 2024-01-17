

import { FC } from "react";

import { FDate } from "@/class/FDate";
import { TomatoTimer } from "@/class/TomatoTimer";

import { SettingsItem } from "./SettingsItem";

export type TTimerSettings = {
  timer: TomatoTimer;
};

const ONE_MINUTES = FDate.fromString('1m');

export const TimerSettings: FC<TTimerSettings> = ({ timer }) => (
  <>
    <SettingsItem
      label="Work Time"
      denom={ONE_MINUTES}
      signal={timer.steps.work.time}
      min={1}
      max={90}
      step={1} />

    <SettingsItem
      label="Break Time"
      denom={ONE_MINUTES}
      signal={timer.steps.break.time}
      min={1}
      max={90}
      step={1} />

    <SettingsItem
      label="Relax Time"
      denom={ONE_MINUTES}
      signal={timer.steps.relax.time}
      min={1}
      max={90}
      step={1} />

    <SettingsItem
      label="Iterations count"
      signal={timer.needIters}
      min={1}
      max={15}
      step={1} />
  </>
);