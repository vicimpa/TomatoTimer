import { FC, ReactNode } from "react";

import { FormGroup, Slider, Typography } from "@mui/material";
import { Signal, useSignal } from "@preact/signals-react";
import { useComputed } from "@preact/signals-react/runtime";

export type TSettingsItemProps = {
  label?: string;
  denom?: number;
  icon?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  signal?: Signal<number>;
};

export const SettingsItem: FC<TSettingsItemProps> = ({
  label = 'Unnamed',
  icon,
  signal,
  denom = 1,
  ...props
}) => {
  const defaultSignal = useSignal((props.max ?? 0 - (props.min ?? 0)) / 2);
  const currentSignal = signal ?? defaultSignal;
  const denomValue = useComputed(() => currentSignal.value / denom);
  const sliderElement = useComputed(() => (
    <Slider
      key="slider"
      value={denomValue.value}
      onChange={(_, val) => currentSignal.value = +val * denom}
      {...props} />
  ));

  return (
    <FormGroup>
      <Typography>
        {icon}
        {denomValue}
        {' - '}
        {label}
      </Typography>

      {sliderElement}
    </FormGroup>
  );
};