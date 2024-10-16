import { FC } from "react";

import { times } from "@/utils/times";
import { styled, Typography } from "@mui/material";

export type TShowTimeProps = {
  time: number;
};

const TimeMS = styled('span')({
  fontSize: 20,
  fontWeight: 'normal',
  position: 'absolute',
  bottom: 0
});

export const ShowTime: FC<TShowTimeProps> = ({ time }) => {
  const [msec, sec, min, hor] = times(time, [1000, 60, 60, 0]);

  return (
    <Typography
      variant="h2"
      padding="5px 50px"
      align="center"
      fontWeight={600}
      fontFamily={'Roboto Mono'}
      position="relative"
    >
      {hor}:{min}:{sec}
      <TimeMS>
        {msec.padStart(3, '0')}
      </TimeMS>
    </Typography>
  );
};