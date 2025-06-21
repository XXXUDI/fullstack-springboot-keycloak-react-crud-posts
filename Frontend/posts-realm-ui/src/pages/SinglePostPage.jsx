import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hook/useFetching";
import {PostService} from "../service/PostService";
import {useKeycloak} from "../keycloak/keycloakContext";
import cl from '../styles/SinglePostPage.module.css'
import CommentTree from "../component/commentTree";
import CommentForm from "../component/CommentForm";
import PostForm from "../component/postForm";
import CustomModal from "../component/UI/Modal/CustomModal";

const SinglePostPage = () => {

    const {keycloak} = useKeycloak();

    const navigate = useNavigate();

    const params = useParams();
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({});
    const [modal, setModal] = useState(false)

    const [fetchPostById, isPostLoading, error] = useFetching(async () => {
        const response = await PostService.getPost(params.id, keycloak.token);
        setComments(response.comments || [])
        setPost(response);
    })

    useEffect(() => {
        fetchPostById()
    }, []);

    async function uploadComment(commentDto) {
        console.log("Uploading comment: ", commentDto);
        await PostService.uploadComment(commentDto, params.id, keycloak.token);
        await fetchPostById();
    }

    function isAdmin() {
        const roles = keycloak.tokenParsed?.realm_access?.roles || [];

        return roles.includes('admin');

    }

    async function deletePost() {
        await PostService.deletePost(params.id, keycloak.token);
        navigate('/posts');
    }

    async function updatePost(postDto) {
        await PostService.updatePost(postDto, params.id, keycloak.token);
        await fetchPostById();
        setModal(false);
    }

    return (
        <div className={cl.main}>



            {post.authorId === keycloak.tokenParsed?.sub || isAdmin()
            ? <h3>You have access for this actions:
                    <button onClick={() => setModal(true)}>UPDATE</button> /
                    <button onClick={deletePost}>DELETE</button> </h3>
            : null}

            <CustomModal visible={modal} setVisible={setModal}>
                <PostForm action={updatePost} data={post}/>
            </CustomModal>

            <h1 className={cl.post__title}>{post.title}</h1>
            <h3 className={cl.post__category}>{post.category}</h3>
            <div className={cl.post__content}>
                <img src={post.image} alt='Post image' className={cl.post__image}/>
                <p className={cl.post__body}>{post.body}</p>
                <div className={cl.comments__section}>
                    <h2 style={{textAlign: 'center', margin: 20}}>Comments</h2>
                    <CommentForm upload={uploadComment} postId={params.id}/>
                    {comments.length === 0
                        ? <h1 style={{textAlign: 'center'}}>There is no comments</h1>
                        : comments.map((comment, idx) => (
                            <CommentTree key={idx} comment={{ ...comment, upload: uploadComment }} level={0}/>
                        ))
                    }
                </div>

            </div>

        </div>
    );
};

export default SinglePostPage;