import React, { useState } from 'react';
import CommentForm from './CommentForm';
import {useKeycloak} from "../keycloak/keycloakContext";

const CommentTree = ({ comment, level = 0 }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const {keycloak} = useKeycloak();

    return (
        <div style={{ marginLeft: `${level * 20}px`, borderLeft: '1px solid #ddd', paddingLeft: '10px', marginTop: '10px' }}>
            <div>
                <strong>User:</strong> {comment.userId} <br/>
                <p>{comment.content}</p>
                <small>{new Date(comment.createdDate).toLocaleString()}</small>
                <br />
                <button onClick={() => setShowReplyForm(!showReplyForm)} style={{ fontSize: '12px' }}>
                    {showReplyForm ? 'Cancel' : 'Reply'}
                </button>
            </div>

            {showReplyForm && (
                <CommentForm
                    upload={(replyDto) => {
                        replyDto.parentCommentId = comment.id;
                        replyDto.postId = comment.postId;
                        replyDto.userId = keycloak.tokenParsed?.sub;
                        replyDto.createdDate = new Date();
                        replyDto.modifiedDate = new Date();
                        setShowReplyForm(false);
                        comment.upload(replyDto);
                    }}
                    postId={comment.postId}
                    parentCommentId={comment.id}
                />
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div>
                    {comment.replies.map((reply) => (
                        <CommentTree key={reply.id || reply.content} comment={{ ...reply, upload: comment.upload }} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentTree;
