import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Quiz from './components/Question/Question';
import ErrorPage from './components/Error/ErrorPage';

const Root = ()  => {
  return(
    <div className='container'>
      <div className='main'>
        <App/>
      </div>
      <div className='outlet'>
        <Outlet/> 
      </div>
    </div>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
        <Route index path='viktorina' element={<Quiz/>}/>
        <Route path='*' element={<ErrorPage/>}/>
    </Route>
  )
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
