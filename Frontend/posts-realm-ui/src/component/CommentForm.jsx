import React, { useState, useEffect } from 'react';
import CustomInput from "./UI/input/CustomInput";
import TransparentButton from "./UI/button/TransparentButton";
import { useKeycloak } from "../keycloak/keycloakContext";

const CommentForm = ({ upload, postId, parentCommentId }) => {
    const { keycloak } = useKeycloak();

    const [comment, setComment] = useState({
        postId: '',
        userId: '',
        parentCommentId: '',
        content: '',
        modifiedDate: '',
        createdDate: '',
    });

    // Синхронизация props → state
    useEffect(() => {
        setComment((prev) => ({
            ...prev,
            postId: postId,
            userId: keycloak.tokenParsed?.sub,
            parentCommentId: parentCommentId || null,
            modifiedDate: new Date(),
            createdDate: new Date(),
        }));
    }, [postId, parentCommentId, keycloak.tokenParsed?.sub]);

    const uploadNewComment = (e) => {
        e.preventDefault();
        if (!comment.content.trim()) return;

        const newComment = { ...comment };
        console.log("Upload comment: ", newComment);

        upload(newComment);

        setComment((prev) => ({
            ...prev,
            content: '',
            modifiedDate: new Date(),
            createdDate: new Date(),
        }));
    };

    return (
        <form>
            <CustomInput
                value={comment.content}
                onChange={(e) => setComment({ ...comment, content: e.target.value })}
                type="text"
                placeholder="Type your comment..."
            />
            <TransparentButton onClick={uploadNewComment}>Send Comment</TransparentButton>
        </form>
    );
};

export default CommentForm;
