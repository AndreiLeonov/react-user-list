import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export const CheckboxIsActive = (props) => {

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={props.checked}
                    onChange={props.onChange}
                    name="checkedB"
                    color="primary"
                />
            }
            label="Показать только активных пользователей"
        />
    );

}