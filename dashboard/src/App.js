import React, { Profiler } from "react";
import { Switch, Route } from "react-router-dom";
import "./css/style.scss";
import "./components/charts/ChartjsConfig";
import Analytics from "./components/Analytics";

function App() {
  const logProfile = (
    id,
    phase,
    actualTime,
    actualDuration,
    baseTime,
    startTime,
    commitTime
  ) => {
    console.log(`${id}'s ${phase} phase:`);
    console.log(`Actual time: ${actualTime}`);
    console.log(`Actual time: ${actualDuration}`);
    console.log(`Base time: ${baseTime}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
  };
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Profiler id="Analytics" onRender={logProfile}>
            <Analytics />
          </Profiler>
        </Route>
      </Switch>
    </>
  );
}

export default App;
