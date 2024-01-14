import { TomatoTimer } from "./scripts/tomatoTimer.js";

let tomatoTimer = new TomatoTimer("taimers");

tomatoTimer.setTheTimerControl("startTimer", "stopTimer", "resetTimer", "skipIteration");
tomatoTimer.setCurrentTime 