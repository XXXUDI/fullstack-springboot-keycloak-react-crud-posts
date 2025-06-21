import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: 'http://localhost:8080', // localhost | YOUR KEYCLOAK URL
    realm: 'posts-realm',
    clientId: 'post-client'
});

export default keycloak;
