import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Resource/Stylesheets/reset.css';
import './Resource/Stylesheets/config.css';
import './Resource/Stylesheets/fontiran.css';
import './Resource/Stylesheets/responsive.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router ,Routes, Route}
 from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Resource from './Resource';
import {store} from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={Resource.Routes.HOME} element={<HomePage/>}/>
          <Route path={Resource.Routes.AUTH} element={<AuthPage/>}  />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
