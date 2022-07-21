import React from 'react'; //Imports the library & creates an object containing properties needed by React.{React.createElement() & React.Component} 
import ReactDOM from 'react-dom'; //Creates an object containing methods that help React interact with the DOM, such as ReactDOM.render()
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( //Method that renders JSX element to the DOM by taking a JSX expression & creating tree of DOM nodes
  <React.StrictMode> {/*StrictMode highlights potential problems in applications. Activates additional checks & warnings for its descendants*/}
    <App />
  </React.StrictMode>,
  document.getElementById('root') //Container for the rendered React Application
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
