import { TimeLine } from "@/class/TimeLine";
import { TomatoTimer } from "@/class/TomatoTimer";
import { Canvas } from "@/components/Canvas";
import { ShowTime } from "@/components/ShowTime";
import { TimerControlls } from "@/components/TimerControlls";
import { TimerSettings } from "@/components/TimerSettings";
import { useClass } from "@/hooks/useClass";
import { GitHub } from "@mui/icons-material";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useComputed } from "@preact/signals-react";

export const App = () => {
  const timer = useClass(TomatoTimer);
  const renderer = useClass(TimeLine, timer);

  const timerElement = useComputed(() => (
    <ShowTime time={timer.remaining.value} />
  ));

  const statusElement = useComputed(() => (
    <Typography
      align="center"
      variant="h5"
      fontFamily="Roboto Mono"
      color={timer.stepObject.value.color}
    >
      {timer.stepName} ({((timer.time.value / timer.stepTime.value) * 100).toFixed(2)}%)
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
      <Typography
        variant="h5"
        align="center"
        fontWeight={200}
      >
        T🍅matoTimer
      </Typography>

      <Card elevation={0} >
        <CardContent>
          {timerElement}
          {statusElement}

          <Canvas height={40} rendering={renderer} />

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
              <TimerSettings timer={timer} />
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Link target="_blank" href="https://github.com/vicimpa/TomatoTimer"><GitHub /> GitHub Repository</Link>
      </center>

    </Grid >
  );
};