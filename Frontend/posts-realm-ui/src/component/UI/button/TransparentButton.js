import React from 'react';
import classes from './TransparentButton.module.css';

const TransparentButton = ({children, ...props}) => {
    return (
        <div { ...props} className={classes.transparentButton} >
            {children}
        </div>
    );
};

export default TransparentButton;