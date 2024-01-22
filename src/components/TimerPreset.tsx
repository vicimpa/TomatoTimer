import { ChangeEvent, FC, useRef, useState } from "react";

import { TomatoTimerPreset } from "@/class/TomatoTimerPreset";
import { useFirstRender } from "@/hooks/useFirstRender";
import { Button, Grid, TextField, Typography, styled } from "@mui/material";

export interface ITimerPreset {
  presetsManager: TomatoTimerPreset;
}

const TypographyStyled = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.2),
  marginBottom: theme.spacing(1),
}));

const ButtonLoad = styled(Button)(() => ({
  flex: 1,
  height: "56px",
}));

export const TimerPreset: FC<ITimerPreset> = ({ presetsManager }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const isFirstRender = useFirstRender();
  const [error, setError] = useState<string | null>(null);

  const onChangeCodeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (!e.target.value) {
      setError("Code is empty");
      return;
    }

    if (!presetsManager.checkCode(e.target.value)) {
      setError(
        "Code is not assigned: workTime-breakTime-relaxTime-needIters-speed"
      );
      return;
    }

    setError(null);
  };

  const onLoadPreset = () => {
    const inputEl = inputRef.current;

    if (!inputEl) return;

    try {
      presetsManager.loadCode(inputEl.value);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const onCopyCode = async () => {
    await navigator.clipboard?.writeText(presetsManager.code);
  };

  const onReset = () => {
    presetsManager.reset();
  };

  return (
    <>
      <TypographyStyled variant="h5">Preset</TypographyStyled>
      <Grid container gap={2}>
        <Grid
          item
          container
          display="grid"
          gridTemplateColumns={"1fr 1fr"}
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          width="100%"
        >
          <TextField
            label="Code"
            value={inputValue}
            variant="outlined"
            inputRef={inputRef}
            onInvalid={(e) => e.preventDefault()}
            onChange={onChangeCodeInput}
            error={!!error}
            helperText={error}
          />
          <ButtonLoad
            variant="outlined"
            color="success"
            onClick={onLoadPreset}
            disabled={isFirstRender || !!error}
          >
            Load
          </ButtonLoad>
        </Grid>
        <Grid
          item
          container
          display="grid"
          gridTemplateColumns={"1fr 1fr"}
          gap={2}
          width="100%"
        >
          <Button variant="outlined" color="primary" onClick={onCopyCode}>
            Copy code
          </Button>
          <Button variant="outlined" color="error" onClick={onReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
