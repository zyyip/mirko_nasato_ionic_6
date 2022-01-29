import { IonApp, IonLoading } from "@ionic/react";
import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import AppTabs from './AppTabs';
import { AuthContext, useAuthInit } from './auth';
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";


const App: React.FC = () => {

  const { loading, auth } = useAuthInit();

  if (loading) {
    return <IonLoading isOpen />
  }

  console.log(`rendering App with authState=`, auth);
  return (
    <IonApp>
      <AuthContext.Provider value={ auth }>
        <IonReactRouter>
          <Switch>
            <Route exact path="/register">
              <RegisterPage homePage="entries"/>
            </Route>
            <Route exact path="/login">
              {/* <LoginPage homePage="entries" onLogin={() => setLoggedIn(true)} /> */}
              <LoginPage homePage="entries" />
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
