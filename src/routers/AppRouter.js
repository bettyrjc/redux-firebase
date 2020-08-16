import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { firebase } from "../firebase/config";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../action/authAction";

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);

  const dispatch = useDispatch();
  //   para saber si esta loggeqado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   para que se mantega logeado asi se recargue
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  //   loading
  if (checking) {
    return <h1>Espera..</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isLoggedIn={isLoggedIn}
          />

          <PrivateRoute
            exact
            path="/"
            component={JournalScreen}
            isLoggedIn={isLoggedIn}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
