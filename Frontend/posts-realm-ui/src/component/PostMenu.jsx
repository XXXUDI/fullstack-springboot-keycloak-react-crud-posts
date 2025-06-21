import React from 'react';
import cl from './styles/PostMenu.module.css'

const PostMenu = ({children}) => {
    return (
        <div className={cl.buttons__container}>
            {children}
        </div>
    );
};

export default PostMenu;