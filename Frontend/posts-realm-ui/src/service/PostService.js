import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/posts';

export class PostService {
    static async getPost(id, token = null) {
        try {

            const response = await axios.get(`${BASE_URL}/${id}`, {
                headers: token ? {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                } : {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('Post not found');
            }
            throw error;
        }
    }

    static async getAllPosts(token = null) {
        try {
            const response = await axios.get(BASE_URL, {
                headers: token ? {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                } : {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async uploadComment(commentDto, postId, token = null) {
        try {
            console.log("Send request to gateway with token: ", token)
            const response = await axios.post(`${BASE_URL}/comment/${postId}`, commentDto, {
                headers: token ? {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                } : {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createPost(postDto, token = null) {
        try {
            const response = await axios.post(`${BASE_URL}/create`, postDto, {
                headers: token ? {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                } : {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createMockedPost(token = null) {

        const postDto = {
            title: "My First Post",
            body: "This is the content of my first post.",
            image: null,
            category: "Politics",
            createdDate: Date.now(),
            modifiedDate: Date.now(),
            comments: [],
            authorId: "f0ba5d7b-b4d1-48b2-9b51-34d41b5be58a"
        };

        try {
            const response = await axios.post(`${BASE_URL}/create`, postDto, {
                headers: token ? {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                } : {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updatePost(postDto, id, token = null) {
        try {
            const response = await axios.put(`${BASE_URL}/update/${id}`, postDto, {
                headers: token ? {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                } : {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deletePost(id, token = null) {
        try {
            await axios.delete(`${BASE_URL}/delete/${id}`, {
                headers: token ? {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                } : {
                    'Content-Type': 'application/json',
                }
            });
            return true;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('Post not found');
            }
            throw error;
        }
    }
}