import {useKeycloak} from "./keycloak/keycloakContext";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import './styles/App.css';
import Navbar from "./component/UI/navbar/Navbar";

function App() {
    const {keycloak, authenticated, initialized} = useKeycloak();

    if(!initialized) { return <div>Loading...</div>; }

    if(!authenticated) { return <div>Login required!</div>}

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
}
export default App;
