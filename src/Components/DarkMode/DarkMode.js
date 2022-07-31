import React, { useState, useEffect } from "react";
import "../../App/css/darkMode.css";

import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

import styles from "./DarkmodeIcon.module.css";

const DarkMode = () => {
  const [theme, setTheme] = useState();
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  // let theme;

  useEffect(() => {
    if (localStorage) {
      // theme = localStorage.getItem("theme");

      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);

      localStorage.setItem("theme", "light");
      // theme = lightTheme;
      setTheme(lightTheme);
    } else {
      body.classList.replace(lightTheme, darkTheme);

      localStorage.setItem("theme", "dark");
      // theme = darkTheme;
      setTheme(darkTheme);
    }
  };

  return (
    <button
      className={theme === "dark" ? clickedClass : ""}
      id="darkMode"
      onClick={(e) => switchTheme(e)}
    >
      {theme === "light" ? (
        <BsFillSunFill className={styles.icon} />
      ) : (
        <BsMoonStarsFill className={styles.icon} />
      )}
    </button>
  );
};

export default DarkMode;
