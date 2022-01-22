import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { React, useState } from "react";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import { Route, Redirect } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings } from 'ionicons/icons';
import EntryPage from "./pages/EntryPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rendering App with loggedIn=${loggedIn}`);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route Route exact path="/login">
              <LoginPage homePage="entries" loggedIn={loggedIn} onLogin={() => setLoggedIn(true)}/>
            </Route>
            <Route Route exact path="/entries/:id">
              <EntryPage />
            </Route>
            <Route exact path="/entries">
            {loggedIn ? <HomePage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/settings">
              <SettingsPage />
            </Route>
            <Redirect exact path="/" to="/entries" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/entries">
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
