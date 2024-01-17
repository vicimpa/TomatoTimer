import { FC } from "react";

import { TomatoTimer } from "@/class/TomatoTimer";
import { Clear, PlayArrow, RestartAlt, SkipNext, Stop } from "@mui/icons-material";
import { ButtonGroup, IconButton } from "@mui/material";
import { useComputed } from "@preact/signals-react/runtime";

export type TTimerControlls = {
  timer: TomatoTimer;
};

export const TimerControlls: FC<TTimerControlls> = ({ timer }) => {
  const startStopIcon = useComputed(() => (
    timer.isRunning.value ? <Stop /> : <PlayArrow />
  ));

  return (
    <ButtonGroup variant="contained">
      <IconButton
        onClick={() => timer.startStop()}
        color="primary"
        title="Start/Stop"
      >
        {startStopIcon}
      </IconButton>

      <IconButton
        onClick={() => timer.skip()}
        color="info"
        title="Skip"
      >
        <SkipNext />
      </IconButton>

      <IconButton
        onClick={() => timer.resetCurrent()}
        color="secondary"
        title="Restart"
      >
        <RestartAlt />
      </IconButton>

      <IconButton
        onClick={() => (timer.reset())}
        color="warning"
        title="Reset"
      >
        <Clear />
      </IconButton>
    </ButtonGroup>
  );
};