import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import TopNav from "../MainHeader/TopNav";
import ButtonNav from "./ButtonNav";

import styles from "./styles.scss";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { pathname } = useLocation();

  //const theme = useSelector((appState: any) => appState.AppReducer.theme);

  return (
    <div className={styles.container}>
      <TopNav />
      <ButtonNav />
    </div>
  );
};

export default Header;
