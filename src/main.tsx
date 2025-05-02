import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthProvider } from './components/context/AuthContext';

// Call the element loader before the render call
// defineCustomElements(window);
function isMobileDevice() {    
  if( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/webOS/i) 
    || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i) 
  || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) 
  || navigator.userAgent.match(/Windows Phone/i)    ){ 
    return true;
  } else {
    return false;
  }
}
 
if( !isMobileDevice()){    defineCustomElements(window);}


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>

     <AuthProvider>
    <App />
     </AuthProvider>

  </React.StrictMode>
);