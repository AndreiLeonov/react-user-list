import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styles from "../styles/styles.module.css";

export const Preloader = () => {
    return (
        <div className={styles.commonStyle}>
            <CircularProgress disableShrink />
        </div>
    );

}