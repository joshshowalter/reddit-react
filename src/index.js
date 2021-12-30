import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Home from './home/home';
import Detail from './detail/detail';
// import Detail from './detail/detail';
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#37474f',
      light: '#718792',
      dark: '#1c313a'
    },
    secondary: {
      main: '#4fc3f7',
      light: '#8bf6ff',
      dark: '#0093c4'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/post/:id">
          <Detail />
          {/* <Temp /> */}
        </Route>
        <Route render={() => <Redirect to="/"/>}/>
      </Switch>
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

function Temp() {
  return (
    <>
      <div>Hello!</div>
    </>
  )
}