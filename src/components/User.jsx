import React from 'react';
import { v1 } from "uuid";
import styles from '../styles/styles.module.css';
import moment from 'moment';

export const User = (props) => {

    return (
        <div>
            {
            props.usersData
            .map((user) => ( <div key={v1()} className={styles.commonStyle}><ul><li> {user.last_name} {user.first_name}, {moment(user.created_at).utcOffset(180).format('DD.MM.YYYY, HH:mm:ss')} </li></ul></div> ))
            }
            </div>
    );

}