import React from "react";
import { Input } from "@material-ui/core";

export const Search = (props) => {

    return (
        <Input
            type="text"
            placeholder="Начните поиск"
            onChange={props.onChange}
            value={props.value}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
          />
    );
}