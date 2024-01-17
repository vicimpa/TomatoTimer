

import { FC } from "react";

import { TomatoTimer } from "@/class/TomatoTimer";
import { ONE_MINUTES } from "@/config";
import { Engineering, Flag, FreeBreakfast, Hotel, Search } from "@mui/icons-material";

import { SettingsItem } from "./SettingsItem";

export type TTimerSettings = {
  timer: TomatoTimer;
};

export const TimerSettings: FC<TTimerSettings> = ({ timer }) => (
  <>
    <SettingsItem
      label="Timeline"
      signal={timer.zoom}
      denom={100}
      icon={<Search color="error" />}
      min={1}
      max={200} />

    <SettingsItem
      label={timer.steps.work.name}
      denom={ONE_MINUTES}
      signal={timer.steps.work.time}
      icon={<Engineering color="primary" />}
      min={1}
      max={90}
      step={1} />

    <SettingsItem
      label={timer.steps.break.name}
      denom={ONE_MINUTES}
      signal={timer.steps.break.time}
      icon={<FreeBreakfast color="success" />}
      min={1}
      max={90}
      step={1} />

    <SettingsItem
      label={timer.steps.relax.name}
      denom={ONE_MINUTES}
      icon={<Hotel color="secondary" />}
      signal={timer.steps.relax.time}
      min={1}
      max={90}
      step={1} />

    <SettingsItem
      label="Iterations count"
      signal={timer.needIters}
      icon={<Flag color="warning" />}
      min={1}
      max={15}
      step={1} />
  </>
);