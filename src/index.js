import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css';
import App from './mainpage/App';
import BeerSpace from './beerspace/BeerSpace';
import Sanke from './snake/Snake';
import reportWebVitals from './reportWebVitals';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [

    ]
  },
  {
    path: "/rultenpastinsen",
    element: <BeerSpace />
  },
  {
    path: "/beerspace",
    element: <BeerSpace />
  },
  {
    path: "/snake",
    element: <Sanke />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
