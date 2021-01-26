import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import routes from '../routes'
import requireAuth from '../components/requireAuth'
import { withGuestLayout, withMemberLayout } from '../components/Layouts/RouteWithLayout'
import TopPage from '../containers/TopPage'
import SignInPage from '../containers/SignInPage'
import SignUpPage from '../containers/SignUpPage'
import HomePage from '../containers/HomePage'
import MyPage from '../containers/MyPage'


export default ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.top()} render={withGuestLayout(TopPage)} />
      <Route exact path={routes.signIn()} render={withGuestLayout(SignInPage)} />
      <Route exact path={routes.signUp()} render={withGuestLayout(SignUpPage)} />

      <Route exact path={routes.home()} render={withMemberLayout(requireAuth(HomePage))}/>
      <Route exact path={routes.myPage()} render={withMemberLayout(requireAuth(MyPage))} />
    </Switch>
  </ConnectedRouter>
)
