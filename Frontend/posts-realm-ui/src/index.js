import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {KeycloakProvider} from "./keycloak/keycloakContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<KeycloakProvider>
    <App/>
</KeycloakProvider>
);


