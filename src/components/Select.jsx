import React from "react";
import { FormControl, InputLabel,makeStyles,MenuItem,Select, } from "@material-ui/core";
import styles from "../styles/styles.module.css";

export const Filter = (props) => {

    //styles for Select:
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
  }));
  const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
        <InputLabel
          className={styles.selectStyle}
          id="demo-controlled-open-select-label"
        >
          Сортировать по дате создания
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={props.open}
          onClose={props.handleClose}
          onOpen={props.handleOpen}
          value={props.sortType}
          onChange={props.handleChange}
          defaultValue={"1"}
        >
          <MenuItem value={"withoutSorting"}>Без сортировки</MenuItem>
          <MenuItem value={"asc"}>По возрастанию</MenuItem>
          <MenuItem value={"desc"}>По убыванию</MenuItem>
        </Select>
      </FormControl>
    );
}