import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Home from './home/home';
import './index.css';
import Detail from './home/detail';

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
      <Detail open={false} />
      <Home />
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);