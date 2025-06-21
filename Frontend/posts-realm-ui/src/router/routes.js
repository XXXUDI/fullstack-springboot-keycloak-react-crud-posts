import MockPage from "../pages/MockPage";
import PostPage from "../pages/PostPage";
import SinglePostPage from "../pages/SinglePostPage";

export const routes = [
    {path: '/mock', element: <MockPage/>, exact: true},
    {path: '/posts', element: <PostPage/>, exact: true},
    {path: '/posts/:id', element: <SinglePostPage/>, exact: true}
];