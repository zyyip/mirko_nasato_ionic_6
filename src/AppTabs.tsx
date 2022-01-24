import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import React from 'react';
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import { Route, Redirect } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings } from 'ionicons/icons';
import EntryPage from "./pages/EntryPage";
import { useAuth } from "./auth";

interface Props {

}


const AppTabs: React.FC<Props> = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />
  }
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/my/entries/:id">
            <EntryPage />
          </Route>
          <Route exact path="/my/entries">
            <HomePage />
          </Route>
          <Route exact path="/my/settings">
            <SettingsPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/my/entries">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/my/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

    </IonReactRouter>

  );
};

export default AppTabs;
