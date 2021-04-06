import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../redux/usersReducer";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import styles from "../styles/styles.module.css";
import { User } from "./User";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";

//styles for Select
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

export const Users = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //takes usersData and isLoading from userReducer
  let usersDataCopy = useSelector((state) => state.users.list);
  const isLoading = useSelector((state) => state.users.isLoading);

  const getUsersHandler = () => {
    dispatch(getUsersThunk());
  };

  //for Checkbox(materialUI):
  const [checked, setChecked] = React.useState(false);
  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  //for filtering users:
  if (checked === true) {
    usersDataCopy = usersDataCopy.filter((u) => u.is_active === true);
  }

  //for Select:
  //'withoutSorting' - по умолчанию (как с сервера)
  //asc - по возрастанию
  //desc - по убыванию
  const [sortType, setSortType] = React.useState("withoutSorting");
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

  if (sortType === "asc") {
    usersDataCopy = _.orderBy(usersDataCopy, ["created_at"], ["asc"]);
  } else if (sortType === "desc") {
    usersDataCopy = _.orderBy(usersDataCopy, ["created_at"], ["desc"]);
  }

  //for Search users:
  const [search, setSearch] = React.useState("");
  const [nameFocused, setNameFocused] = React.useState(false);

  if (search.length > 0) {
    usersDataCopy = usersDataCopy.filter((i) => {
      return (
        i.last_name.toLowerCase().match(search.toLowerCase()) ||
        i.first_name.toLowerCase().match(search.toLowerCase())
      );
    });
  };

  const resetHandler = () => {
    setSearch("");
  };

  // window.onkeydown = function (event) {
  //   if (event.keyCode == 27) {
  //     setSearch("");
  //   }
  // };
  document.addEventListener('keydown', function(event) {
    const key = event.key; // const {key} = event; in ES6+
    if (key === "Escape") {
      setSearch("");
    }
});

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
      ) : (
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
            <InputLabel
              className={styles.selectStyle}
              id="demo-controlled-open-select-label"
            >
              Сортировать по дате создания
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={sortType}
              onChange={handleChange}
              defaultValue={"1"}
            >
              <MenuItem value={"withoutSorting"}>Без сортировки</MenuItem>
              <MenuItem value={"asc"}>По возрастанию</MenuItem>
              <MenuItem value={"desc"}>По убыванию</MenuItem>
            </Select>
          </FormControl>
          <input
            type="text"
            placeholder="Начните поиск"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onFocus={(e) => setNameFocused(true)}
            onBlur={(e) => setNameFocused(false)}
          />
          {!!search.length && (
            <Button
              variant="contained"
              color="secondary"
              onClick={resetHandler}
            >
              Сбросить
            </Button>
          )}
          {nameFocused && search.length && usersDataCopy.length === 0 ? (
            <p>Ничего не найдено</p>
          ) : (
            <></>
          )}
          <User usersData={usersDataCopy} />
        </div>
      )}
    </div>
  );
});
