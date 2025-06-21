import React, { useState } from 'react';
import TransparentButton from "../component/UI/button/TransparentButton";
import MockService from "../service/mockService";
import { useKeycloak } from "../keycloak/keycloakContext";
import { useFetching } from "../hook/useFetching";
import {PostService} from "../service/PostService";
import '../styles/MockPage.css'

const MockPage = () => {
    const mockEndpoints = [
        { label: "/realm-roles", action: "roles" },
        { label: "/preferred_username", action: "username" },
        { label: "/check_admin_role", action: "admin" },
        { label: "/email", action: "email" },
        { label: "/sub", action: "sub" },
        { label: "/debug", action: "debug"},
        { label: "/logs", action: "logs"}
    ];

    const postEndpoints = [
        {label: "/createMockPost", action: "createMockPost"},
        {label: "/getAllPosts", action: "getAllPosts"}
    ];


    const { keycloak } = useKeycloak();
    const [response, setResponse] = useState("PLEASE SELECT ENDPOINT TO GET RESPONSE FROM BACKEND / FRONTEND");
    const [statusCode, setStatusCode] = useState(null);

    const [fetchLogs] = useFetching(async () => {
        console.log(keycloak.token)
        const res = await MockService.getLogs(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    })

    const [fetchUsername] = useFetching(async () => {
        const res = await MockService.getUsername(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    });

    const [fetchRoles] = useFetching(async () => {
        const res = await MockService.getRoles(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    });

    const [fetchIsAdmin] = useFetching(async () => {
        const res = await MockService.checkAdminRole(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    });

    const [fetchEmail] = useFetching(async () => {
        const res = await MockService.getEmail(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    });

    const [fetchSub] = useFetching(async () => {
        const res = await MockService.getSub(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    });

    const [fetchDebug] = useFetching(async () => {
        const res = await MockService.debug(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    })

    const [fetchCreateMockPost] = useFetching(async () => {
        const res = await PostService.createMockedPost(keycloak.token);
        setResponse(JSON.stringify(res.data, null, 2));
        setStatusCode(res.status);
    })

    const [fetchAllPosts] = useFetching(async () => {
        const res = await PostService.getAllPosts(keycloak.token);
        setResponse(JSON.stringify(res, null, 2));
        console.log(res)
        setStatusCode(res.status);
    })

    const handleClick = (action) => {
        switch (action) {
            case "username":
                fetchUsername();
                break;
            case "roles":
                fetchRoles();
                break;
            case "admin":
                fetchIsAdmin();
                break;
            case "email":
                fetchEmail();
                break;
            case "sub":
                fetchSub();
                break;
            case "debug":
                fetchDebug();
                break;
            case "logs":
                fetchLogs();
                break;
            case "getAllPosts":
                fetchAllPosts();
                break;
            case "createMockPost":
                fetchCreateMockPost();
                break;
            default:
                break;
        }
    };

    return (
        <div className="main">
            <h1 className="title">Mock Page</h1>

            <div className="response-section">
                <div className="response-box">
                    <p className="label">response</p>
                    <pre className="response">{response}</pre>
                </div>

                <div className="status-box">
                    <p className="label">Status Code</p>
                    <div className="status">{statusCode ? statusCode : "---"}</div>
                </div>
            </div>

            <h2 className="subtitle">Backend Endpoints</h2>
            <div className="endpoints">
                {mockEndpoints.map((endpoint, index) => (
                    <TransparentButton key={index} onClick={() => handleClick(endpoint.action)}>
                        {endpoint.label}
                    </TransparentButton>
                ))}
            </div>
            <div className="endpoints">
                {postEndpoints.map((endpoint, index) => (
                    <TransparentButton key={index} onClick={() => handleClick(endpoint.action)}>
                        {endpoint.label}
                    </TransparentButton>
                ))}
            </div>

            <h2 className="subtitle">Frontend Endpoints</h2>
            <div className="placeholder"></div>
        </div>
    );
};

export default MockPage;
