import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { I18nextProvider } from 'react-i18next'

import Notification from './global/components/notification'
import LogoutLayout from './layouts/logout'
import LoggedLayout from './layouts/logged'
import ConfirmEmail from './pages/authentication/comfirm-email'
import store from './store'
import { history, muiTheme, i18n } from './config'
import { IsLogout, IsLogged } from './hocs'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MuiThemeProvider theme={muiTheme}>
            <Notification />
            <Router history={history}>
              <Switch>
                <Route exact path="/confirm-email/:token" component={ConfirmEmail} />
                <Route path="/profile" component={IsLogged(LoggedLayout)} />
                <Route path="/" component={IsLogout(LogoutLayout)} />
                <Redirect to="/" />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default App
