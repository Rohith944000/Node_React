import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Offices from './Offices.js'
import HeaderWithButton from './HeaderWithButton'
import Footer from './Footer'

ReactDOM.render(
  <React.StrictMode>
    <HeaderWithButton companyName="blabla.com" />
    <Offices />
    <Footer author="Rohith"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
