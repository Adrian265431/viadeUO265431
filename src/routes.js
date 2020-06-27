import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import {
  MyMapComponent,
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Profile,
  FormModelConverter,
  FormModelRenderer,
  UploadRoute,
  Friends,
  MyRoutes,
  NewRoute
} from './containers';

const privateRoutes = [
  {
    id: 'home',
    path: '/viadeUO265431/',
    component: Welcome
  },
  {
    id: 'welcome',
    path: '/viadeUO265431/welcome',
    component: Welcome
  },
  {
    id: 'Mapa',
    path: '/viadeUO265431/mapa',
    component: MyMapComponent
  },
  {
    id: 'profile',
    path: '/viadeUO265431/profile',
    component: Profile
  },
  {
    id: 'formmodelconverter',
    path: '/formmodel/converter',
    component: FormModelConverter
  },
  {
    id: 'formmodelrenderer',
    path: '/formmodel/renderer',
    component: FormModelRenderer
  },
   {
    id: 'newRoute',
    path: '/viadeUO265431/newRoute',
    component: NewRoute
  },
  //{
   // id: 'uploadRoute',
   // path: '/viadeUO265431/uploadRoute',
   // component: UploadRoute
 //},
  {
    id: 'friends',
    path: '/viadeUO265431/friends',
    component: Friends
  },
  {
    id: 'myRoutes',
    path: '/viadeUO265431/myRoutes',
    component: MyRoutes
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/viadeUO265431/login" exact />
        <NotLoggedInLayout component={Register} path="/viadeUO265431/register" exact />
        <NotLoggedInLayout path="/viadeUO265431/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/viadeUO265431/404" component={PageNotFound} exact />
        <Redirect from="/" to="/viadeUO265431/welcome" exact />
        <PrivateLayout path="/viadeUO265431/" routes={privateRoutes} />
        <Redirect from="/login" to="/viadeUO265431/login" exact />
        <Redirect from="/viadeUO265431/#" to="/viadeUO265431/welcome" exact />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
