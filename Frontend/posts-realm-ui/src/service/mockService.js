import axios from "axios";

export default class MockService {

    static async getUsername(token) {
        return await axios.get("http://localhost:8081/api/mock/self/preferred_username", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    static async getRoles(token) {
        return await axios.get("http://localhost:8081/api/mock/self/roles", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    static async checkAdminRole(token) {
        return await axios.post("http://localhost:8081/api/mock/self/checkAdmin",{}, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static async getEmail(token) {
        return await axios.get("http://localhost:8081/api/mock/self/email", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static async getSub(token) {
        console.log("Send request to gateway with token: ", token)
        return await axios.get("http://localhost:8081/api/mock/self/sub", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static async debug(token) {
        return await axios.get("http://localhost:8081/api/mock/self/debug", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static async getLogs(token) {
        return await axios.get("http://localhost:8081/api/mock/self/logs", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
    }
}