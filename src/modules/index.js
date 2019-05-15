import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoutes from "../globals/hoc/AuthRoutes";

const Dashboard = lazy(() => import("./dashboard"));
const Requests = lazy(() => import("./requests"));
const LandingPage = lazy(() => import("./landingPage"));

const Moduleroutes = props => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/" exact render={() => <LandingPage {...props} />} />
        <Route path="/dashboard" render={() => <LandingPage {...props} />} />
        <Route path="/home" render={() => <Dashboard {...props} />} />
        <Route path="/requests" render={() => <Requests {...props} />} />
      </Switch>
    </Suspense>
  );
};

export default AuthRoutes(Moduleroutes);
