import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Section1 from './pages/Section1';
import reportWebVitals from './reportWebVitals';
import Section2 from './pages/section2';
import ProfilePage from './pages/UserProfile';
import Section3 from './pages/section3';
import Section4 from './pages/section4';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import StoreInfo from './pages/store_info';
import Cart from './pages/cart'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/AboutUs",
    element: <Section1/>,
  },
  {
    path: "/BooksOfMonth",
    element: <Section2/>,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/OurBookshop",
    element: <StoreInfo/>
  },
  {
    path: "/cart",
    element: <Cart/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
