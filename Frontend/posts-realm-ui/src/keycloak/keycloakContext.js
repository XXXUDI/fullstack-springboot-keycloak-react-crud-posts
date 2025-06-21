import {createContext, useContext, useEffect, useState} from "react";
import keycloak from "./keycloak";


const KeycloakContext = createContext();

export const KeycloakProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        console.log("Keycloak initializing...");
        keycloak.init({onLoad: 'login-required'})
        .then(authenticated => {
                setAuthenticated(authenticated);
                setInitialized(true);
                console.log("Keycloak successfully initialized");
            })
            .catch(error => {
                console.log("Keycloak initialization failed:" , error);
                setInitialized(false);
            });
    }, [])

    return (
        <KeycloakContext.Provider value={{keycloak, authenticated, initialized}}>
            {children}
        </KeycloakContext.Provider>
    );
}

export const useKeycloak = () => useContext(KeycloakContext);