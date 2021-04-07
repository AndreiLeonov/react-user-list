import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles.module.css";
import { User } from "./User";
import _ from "lodash";
import { Btn } from "./Button";
import { Preloader } from "./Preloader";
import { CheckboxIsActive } from "./Checkbox";
import { Filter } from "./Select";
import { getUsersThunk } from "../redux/usersReducer";
import { Search } from "./Input";

export const Users = React.memo(() => {
  const dispatch = useDispatch();

  //takes usersData and isLoading from userReducer:
  let usersDataCopy = useSelector((state) => state.users.list);
  let isLoading = useSelector((state) => state.users.isLoading);

  const getUsersHandler = () => {
    dispatch(getUsersThunk());
  };

  //for CheckboxIsActive:
  const [checked, setChecked] = React.useState(false);
  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  if (checked === true) {
    usersDataCopy = usersDataCopy.filter((u) => u.is_active === true);
  };

  //for Select:
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

  const searchHandler = (e) => {
    setSearch(e.target.value)
  }
  const onFocusHandler = (e) => {
    setNameFocused(true)
  }
  const onBlurHandler = (e) => {
    setNameFocused(false)
  }

  if (search.length > 0) {
    usersDataCopy = usersDataCopy.filter((i) => {
      return (
        i.last_name.toLowerCase().match(search.toLowerCase()) ||
        i.first_name.toLowerCase().match(search.toLowerCase())
      );
    });
  };

  //for reset search data:
  const resetHandler = () => {
    setSearch("");
  };

  document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key === "Escape") {
      setSearch("");
    }
  });

  return (
    <div className={styles.commonStyle}>
      <Btn
        isLoading={isLoading}
        variant={"contained"}
        color={"primary"}
        title={"Загрузить список"}
        onClick={getUsersHandler}
      />
      {isLoading ? <Preloader /> : (
        <div className={styles.commonStyle}>
          <CheckboxIsActive
            checked={checked}
            onChange={handleChangeCheckbox} />
          <Filter
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
            sortType={sortType}
            handleChange={handleChange} />
          <Search
            onChange={searchHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            value={search}
          />
          {!!search.length && <Btn
            variant={"contained"}
            color={"secondary"}
            onClick={resetHandler}
            title={"Сбросить"}
          />
          }
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
