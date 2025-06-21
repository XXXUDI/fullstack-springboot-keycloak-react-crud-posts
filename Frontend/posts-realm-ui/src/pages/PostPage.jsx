import React, {useEffect, useState} from 'react';
import TransparentButton from "../component/UI/button/TransparentButton";
import '../styles/PostPage.css'
import {PostService} from "../service/PostService";
import {useKeycloak} from "../keycloak/keycloakContext";
import {useFetching} from "../hook/useFetching";
import PostForm from "../component/postForm";
import CustomModal from "../component/UI/Modal/CustomModal";
import PostList from "../component/postList";
import PostMenu from "../component/PostMenu";

const PostPage = () => {

    const { keycloak } = useKeycloak();

    const [modal, setModal] = useState(false); // Will be used to open dialog menu to create posts
    const [posts, setPosts] = useState([]);


    const [fetchAllPosts, isPostsLoading] = useFetching(async () => {
        const res = await PostService.getAllPosts(keycloak.token);
        setPosts(res);
    })

    useEffect(() => {
        fetchAllPosts();
    }, []);

    async function createPost(postDto) {
        await PostService.createPost(postDto, keycloak.token)
        setModal(false);
        fetchAllPosts().then(r => console.log("Successfully created post"));
    }

    return (
        <div>
            <h1 style={{textAlign: 'center' , marginTop: 25}}>POST LIST</h1>
            <CustomModal visible={modal} setVisible={setModal}>
                <PostForm action={createPost}/>
            </CustomModal>
            <PostMenu>
                <TransparentButton onClick={() => setModal(true)}>
                    UPLOAD POST
                </TransparentButton>
                <TransparentButton onClick={() => console.log(posts)}>PRINT ALL OBJECTS</TransparentButton>
            </PostMenu>
            <PostList posts={posts}/>
        </div>
    );
};

export default PostPage;