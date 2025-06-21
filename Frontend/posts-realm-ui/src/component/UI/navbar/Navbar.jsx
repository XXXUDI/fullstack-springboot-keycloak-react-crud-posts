import React from 'react';
import TransparentButton from "../button/TransparentButton";
import {useKeycloak} from "../../../keycloak/keycloakContext";
import {Link} from "react-router-dom";

const Navbar = () => {

    const {keycloak} = useKeycloak();

    return (
        <div className="header">
            <div className="header-left">
                <Link to="/posts">Post Service</Link>
                <Link to="/mock">Mock Service</Link>
            </div>
            <TransparentButton onClick={keycloak.logout} >Logout</TransparentButton>
        </div>
    );
};

export default Navbar;