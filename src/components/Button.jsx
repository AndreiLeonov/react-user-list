import React from "react";
import Button from "@material-ui/core/Button";
import styles from "../styles/styles.module.css";

export const Btn = (props) => {

    return (
        <Button
            className={styles.commonStyle}
            disabled={props.isLoading}
            onClick={props.onClick}
            variant={props.variant}
            color={props.color}
        >
            {props.title}
        </Button>
    );
}