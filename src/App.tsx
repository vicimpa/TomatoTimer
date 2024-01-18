import { TimeLine } from "@/class/TimeLine";
import { TomatoTimer } from "@/class/TomatoTimer";
import { ShowTime } from "@/components/ShowTime";
import { TimerControlls } from "@/components/TimerControlls";
import { TimerSettings } from "@/components/TimerSettings";
import { useClass } from "@/hooks/useClass";
import { GitHub } from "@mui/icons-material";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useComputed, useSignal } from "@preact/signals-react";

import { Canvas } from "./components/Canvas";
import { DEFAULT_ZOOM } from "./config";

export const App = () => {
  const zoom = useSignal(DEFAULT_ZOOM);
  const timer = useClass(TomatoTimer);
  const renderer = useClass(TimeLine, timer, zoom);

  const timerElement = useComputed(() => (
    <ShowTime time={timer.remaining.value} />
  ));

  const statusElement = useComputed(() => (
    <Typography
      align="center"
      variant="body1"
      fontFamily="Roboto Mono"
      color={timer.stepObject.value.color}
    >
      {timer.stepName}
    </Typography>
  ));

  const remainingStatus = useComputed(() => (
    <Typography
      align="center"
      variant="body2"
      fontFamily="Roboto Mono"
      color={timer.stepObject.value.color}
    >
      {((timer.time.value / timer.stepTime.value) * 100).toFixed(2)}%
    </Typography>
  ));

  return (
    <Grid
      width={'100%'}
      minWidth={400}
      justifyContent={'center'}
      alignContent="center"
      alignItems="center"
    >
      <Card elevation={0} >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            fontWeight={200}
          >
            T🍅matoTimer
          </Typography>
          {timerElement}

          <Card elevation={2} variant="outlined">
            {statusElement}

            <Canvas height={40} rendering={renderer} />

            {remainingStatus}
          </Card>
        </CardContent>
      </Card>

      <center>
        <Grid maxWidth={400}>
          <Card elevation={5}>
            <CardContent>
              <center>
                <TimerControlls timer={timer} />
              </center>
            </CardContent>

            <CardContent>
              <TimerSettings timer={timer} zoom={zoom} />
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Link target="_blank" href="https://github.com/vicimpa/TomatoTimer"><GitHub /> GitHub Repository</Link>
      </center>

    </Grid >
  );
};