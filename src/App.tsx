import { IonApp } from "@ionic/react";
import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import { useState } from 'react';
import AppTabs from './AppTabs';
import { AuthContext } from './auth';
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rendering App with loggedIn=${loggedIn}`);

  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage homePage="entries" onLogin={() => setLoggedIn(true)} />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/entries" />
            <Route>
              <NotFoundPage/>
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
