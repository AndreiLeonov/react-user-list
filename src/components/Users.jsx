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

//обернуть react memo
export const Users = React.memo( () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //takes usersData and isLoading from userReducer
  let usersDataCopy = useSelector((state) => state.users.list);
  const isLoading = useSelector((state) => state.users.isLoading);

  //this is for Button(materialUI)
  const getUsersHandler = () => {
    dispatch(getUsersThunk());
  };

  //this is for Checkbox(materialUI):
  const [checked, setChecked] = React.useState(false);
  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  //this is for filtering users:
  //let usersDataCopy = [...usersData]
  if (checked === true) {
    usersDataCopy = usersDataCopy.filter(u => u.is_active === true)
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

  //for Search users:
  const [search, setSearch] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  // if ( (search.length > 0) && (!usersDataCopy.includes(search.toLowerCase()))) {
  //   setIsError(true);
  // } else {
  //   usersDataCopy = usersDataCopy.filter((i) => {
  //     return i.last_name.toLowerCase().match(search.toLowerCase()) || i.first_name.toLowerCase().match(search.toLowerCase())
  //   }) 
  // }

//   if (search.length > 0) {
//     usersDataCopy = usersDataCopy.filter((i) => {
//       return i.last_name.toLowerCase().match(search.toLowerCase()) || i.first_name.toLowerCase().match(search.toLowerCase())
//   })
// } 


  usersDataCopy = usersDataCopy.filter((i) => {
    return i.last_name.toLowerCase().match(search.toLowerCase()) || i.first_name.toLowerCase().match(search.toLowerCase())
})



// search.length > 0 ? usersDataCopy = usersDataCopy.filter((i) => {
//   return i.last_name.toLowerCase().match(search.toLowerCase()) || i.first_name.toLowerCase().match(search.toLowerCase())
// }) : <div>NOTHING</div>


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
        <InputLabel className={styles.selectStyle} id="demo-controlled-open-select-label">Сортировать по дате создания</InputLabel>
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
      <input type='text' placeholder='Начните поиск' onChange={(e) => setSearch(e.target.value)} value={search}/>
      {usersDataCopy.length ? <></> : <p>Ничего не найдено</p>}
      {isError ? <p>ошибки есть</p> : <></>}
        <User usersData={usersDataCopy}/>
      </div>
      
      }
    </div>
  );
});
