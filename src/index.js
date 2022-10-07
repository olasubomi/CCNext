import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './MainApp';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
// import { createRoot } from 'react-dom/client';
// const root = document.getElementById('root');
// const root = ReactDOM.createRoot(
//     document.getElementById('root')
// );
// root.render(
//     <BrowserRouter >
//         <MainApp />
//     </BrowserRouter>
// );

ReactDOM.render(
    <BrowserRouter >
 <MainApp/>
 </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
