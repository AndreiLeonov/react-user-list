import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../redux/usersReducer";
import { Checkbox, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@material-ui/core";
import styles from "../styles/styles.module.css";
import { User } from "./User";
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

//this is styles for Select
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

export const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const getUserData = (state) => {
  //   return state.users.list.map((user) => ({
  //     created: user.created_at,
  //     firstName: user.first_name,
  //     id: user.id,
  //     isActive: user.is_active,
  //     lastName: user.last_name
  //   }));
  // };

  const usersData = useSelector((state) => state.users.list);
  const isLoading = useSelector((state) => state.users.isLoading);

  // const newDate = [...usersData].map((user) => new Date(user.created_at)); // проверить как работает в редьюсере, а потом удалить
  // console.log(newDate);

  //this is for Button
  const getUsersHandler = () => {
    dispatch(getUsersThunk());
  };

  //this is for Checkbox:
  const [checked, setChecked] = React.useState(false);
  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  //this is for filtering users:
  let usersDataCopy = [...usersData]
  if (checked === true) {
    usersDataCopy = usersData.filter(u => u.is_active === true)
  }

  //this is for Select:
  //'' - по умолчанию (как с сервера)
  //asc - по возрастанию
  //desc - по убыванию
  const [sortType, setSortType] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (sortType === 'asc') {
    usersDataCopy = _.orderBy(usersDataCopy, ['created_at'], ['asc'])
  } else if (sortType === 'desc') {
    usersDataCopy = _.orderBy(usersDataCopy, ['created_at'], ['desc'])
  }

  return (
    <div className={styles.commonStyle}>
      <Button
        className={styles.commonStyle}
        disabled={!!isLoading}
        onClick={getUsersHandler}
        variant="contained"
        color="primary"
      >
        Загрузить список
      </Button>
      {isLoading ? (
        <div className={styles.commonStyle}>
          <CircularProgress disableShrink />
        </div>
      ) : 
      <div className={styles.commonStyle}>
        <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChangeCheckbox}
            name="checkedB"
            color="primary"
          />
        }
        label="Показать только активных пользователей"
      />
      <FormControl className={classes.formControl}>
        <InputLabel className={styles.selectStyle} id="demo-controlled-open-select-label">Отсортировать</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sortType}
          onChange={handleChange}
        >
          <MenuItem value={''}>Без сортировки</MenuItem>
          <MenuItem value={'asc'}>По возрастанию</MenuItem>
          <MenuItem value={'desc'}>По убыванию</MenuItem>
        </Select>
      </FormControl>
        <User usersData={usersDataCopy} />
      </div>
      
      }
    </div>
  );
};
