import { TomatoTimer } from "./tomatoTimer.js";

let tomatoTimer = new TomatoTimer("taimers");

tomatoTimer.setTheTimerControl("startTimer", "stopTimer", "resetTimer", "skipIteration");
tomatoTimer.setCurrentTime