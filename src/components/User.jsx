import React from 'react';
import { v1 } from "uuid";
import styles from '../styles/styles.module.css';

export const User = (props) => {

    return (
        <div>
            {
            props.usersData
            .map((user) => ( <div key={v1()} className={styles.commonStyle}> {user.last_name} {user.first_name} {user.created_at} </div> ))
            }
            </div>
    );

}