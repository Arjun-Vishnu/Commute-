import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from "./router";
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google'
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="585016231360-2sjb507mt02vbn844t18q6ukvmi9s34r.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
</GoogleOAuthProvider>,
);

