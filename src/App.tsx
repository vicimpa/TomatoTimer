import { ShowTime } from "@/components/ShowTime";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useComputed } from "@preact/signals-react";

import { TomatoTimer } from "./class/TomatoTimer";
import { TimerControlls } from "./components/TimerControlls";
import { TimerSettings } from "./components/TimerSettings";
import { useClass } from "./hooks/useClass";

export const App = () => {
  const timer = useClass(TomatoTimer);

  const timerElement = useComputed(() => (
    <ShowTime time={timer.remaining.value} />
  ));

  return (
    <Grid justifyContent={'center'} alignContent="center" alignItems="center">
      <Typography
        variant="h2"
        align="center"
        fontWeight={400}
      >
        TomatoTimer
      </Typography>

      <Card elevation={2} >
        <CardContent>
          {timerElement}

          <center>
            <TimerControlls timer={timer} />
          </center>
        </CardContent>

        <Card elevation={5}>
          <CardContent>
            <TimerSettings timer={timer} />
          </CardContent>
        </Card>
      </Card>

    </Grid >
  );
};