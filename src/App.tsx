import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import React from "react";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import { Route, Redirect } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings } from 'ionicons/icons';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>

          <IonRouterOutlet>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/settings">
              <SettingsPage />
            </Route>
            <Redirect exact path="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home}/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings}/>
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>

      </IonReactRouter>
    </IonApp>
  );
};

export default App;
