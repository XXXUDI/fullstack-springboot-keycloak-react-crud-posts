import React, {useEffect, useState} from 'react';
import CustomInput from "./UI/input/CustomInput";
import TransparentButton from "./UI/button/TransparentButton";
import {useKeycloak} from "../keycloak/keycloakContext";

const PostForm = ({action, data = {}}) => {
    const {keycloak} = useKeycloak();

    const [post, setPost] = useState({
        title: '',
        body: '',
        image: '',
        category: '',
        authorId: keycloak.tokenParsed?.sub || '',
        createdDate: new Date(),
        modifiedDate: new Date()
    });

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setPost({
                title: data.title || '',
                body: data.body || '',
                image: data.image || '',
                category: data.category || '',
                authorId: data.authorId || keycloak.tokenParsed?.sub || '',
                createdDate: data.createdDate ? new Date(data.createdDate) : new Date(),
                modifiedDate: new Date()
            });
        }
    }, [data, keycloak.tokenParsed?.sub]);


    const addNewPost = (e) => {
        e.preventDefault();

        const newPost = {
            id: data.id,
            ...post
        };
        action(newPost);
        setPost({
            title: '',
            category: '',
            body: '',
            image: '',
            authorId: keycloak.tokenParsed?.sub,
            createdDate: new Date(),
            modifiedDate: new Date()
        });
    };

    return (
        <form>
            <CustomInput
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Post title"/>
            <CustomInput
                type="text"
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})}
                placeholder="Content"/>
            <CustomInput
                type="text"
                value={post.category}
                onChange={(e) => setPost({...post, category: e.target.value})}
                placeholder="Category"/>
            <CustomInput
                type="text"
                value={post.image}
                onChange={(e) => setPost({...post, image: e.target.value})}
                placeholder="Image link"/>
            <TransparentButton onClick={addNewPost}>Upload</TransparentButton>
        </form>
    );
};

export default PostForm;
