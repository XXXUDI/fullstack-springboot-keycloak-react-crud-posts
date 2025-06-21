import React from "react";
import cl from './styles/Item.module.css'
import TransparentButton from "./UI/button/TransparentButton";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {

    const navigate = useNavigate();

    return (
        <div className={cl.item}>
            <img className={cl.item__image} src={props.post.image} alt="Post Image"/>
            <div className={cl.item__title}>{props.post.title}</div>
            <div className={cl.item__content}>{props.post.body}</div>
            <div className={cl.item__time}>{new Date(props.post.createdDate).toDateString()}</div>
            <TransparentButton onClick={() => {navigate(`/posts/${props.post.id}`)}}>Open Post</TransparentButton>
        </div>
    );
};

export default PostItem;