import cl from './styles/PostList.module.css'
import PostItem from "./postItem";
import {useRef} from "react";

const PostList = ({posts}) => {

    const nodeRef = useRef(new Map());

    if(posts.length === 0) {
        return <h1 style={{textAlign: "center"}}>No Posts Loaded</h1>
    }

    return (
        <div className={cl.item__container}>
            {posts.map((post, index) => (
                <PostItem
                    ref={nodeRef.current.get(post.id)}
                    key={index}
                    post={post} />
            ))}
        </div>
    );
};

export default PostList;