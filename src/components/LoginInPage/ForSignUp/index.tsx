import React, { useCallback, useRef, useState } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";

import styles from "./styles.scss";
import Header from "../../Header/SigninHeader";

interface HeaderProps { }

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setCount] = useState("");
  return (
    <div>
      <Header />
      <div className={styles.top_Padding}>
        <div className={styles.loginContent}>
          <div className={styles.loginContent_loginFrame}>
            <Switch>
              <Route
                exact
                path="/login/signup"
                component={SetUserNamePassword}
              />
              <Route
                path="/login/signup/CustomerInfo"
                component={CustomerInfo}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
const SetUserNamePassword = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [doubleCheckPassword, setDoubleCheckPassword] = useState();
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeDoubleCheckPassword = (e) => {
    setDoubleCheckPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    console.log(username, password, doubleCheckPassword);
    event.preventDefault();
  };
  let isButtonDisable = true;
  let userNameBlankText = "";
  let passwordBlankText = "";
  let doubleCheckPasswordBlankText = "";
  function checkInputIsBlank() {
    if (
      username == null ||
      password == null ||
      username === "" ||
      password === "" ||
      doubleCheckPassword == null ||
      doubleCheckPassword === "" ||
      doubleCheckPassword != password
    ) {
      console.log("blank");
      isButtonDisable = true;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-not-allow"]}`;
    } else {
      console.log("fill");
      isButtonDisable = false;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-allow"]}`;
    }
  }
  function printIfUserNameBlank() {
    if (username === "") {
      userNameBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      userNameBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfPasswordBlank() {
    if (password === "") {
      passwordBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      passwordBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfDoubleCheckPasswordBlank() {
    if (doubleCheckPassword === "") {
      doubleCheckPasswordBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else if (doubleCheckPassword != password) {
      doubleCheckPasswordBlankText = "輸入的密碼不一致";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      doubleCheckPasswordBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  return (
    <div>
      <div className={styles.loginContent_loginFrame_title}>註冊</div>
      <form onSubmit={handleSubmit}>
        <input
          className={printIfUserNameBlank()}
          type="text"
          placeholder={"使用者名稱"}
          value={username}
          onChange={handleChangeUsername}
        />
        <div className={styles.loginContent_errorText}>{userNameBlankText}</div>
        <input
          className={printIfPasswordBlank()}
          type="password"
          placeholder={"密碼"}
          value={password}
          onChange={handleChangePassword}
        />
        <div className={styles.loginContent_errorText}>{passwordBlankText}</div>
        <input
          className={printIfDoubleCheckPasswordBlank()}
          type="password"
          placeholder={"再輸入一次密碼"}
          value={doubleCheckPassword}
          onChange={handleChangeDoubleCheckPassword}
        />
        <div className={styles.loginContent_errorText}>
          {doubleCheckPasswordBlankText}
        </div>
        <Link to="/login/signup/customerInfo">
          <input
            className={checkInputIsBlank()}
            type="submit"
            value="下一步"
            disabled={isButtonDisable}
          />
        </Link>
      </form>
      <div className={styles.loginContent_subcontent}>
        <div className={styles.loginContent_subcontent_subtitle}>
          已經有帳號了嗎？
        </div>
        <Link to={"/login"}>
          <div className={styles.loginContent_subcontent_signup}>登入</div>
        </Link>
      </div>
    </div>
  );
};

const CustomerInfo = () => {
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (event) => {
    console.log(name, phoneNumber, address);
    event.preventDefault();
  };
  const emailExpression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const phoneNumberExpression = /^\d{10}$/;
  let isButtonDisable = true;
  let userNameBlankText = "";
  let phoneNumberBlankText = "";
  let emailBlankText = "";
  let addressBlankText = "";
  function checkInputIsBlank() {
    if (
      name == null ||
      phoneNumber == null ||
      name === "" ||
      phoneNumber === "" ||
      address == null ||
      address === "" ||
      email == null ||
      email == "" ||
      emailExpression.test(String(email).toLowerCase()) != true || phoneNumberExpression.test(String(phoneNumber)) != true
    ) {
      console.log("blank");
      isButtonDisable = true;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-not-allow"]}`;
    } else {
      console.log("fill");
      isButtonDisable = false;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-allow"]}`;
    }
  }
  function printIfUserNameBlank() {
    if (name === "") {
      userNameBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      userNameBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfPhoneNumberBlank() {
    if (phoneNumber === "") {
      phoneNumberBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else if (
      phoneNumber != "" &&
      phoneNumber != null &&
      phoneNumberExpression.test(String(phoneNumber)) != true
    ) {
      phoneNumberBlankText = "請輸入正確的台灣手機號碼";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      phoneNumberBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfEmailBlank() {
    if (email === "") {
      emailBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else if (
      email != "" &&
      email != null &&
      emailExpression.test(String(email).toLowerCase()) != true
    ) {
      emailBlankText = "請輸入正確的電郵地址: people@example.com";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      emailBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfAddressBlank() {
    if (address === "") {
      addressBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      addressBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }

  return (
    <div>
      <div className={styles.loginContent_loginFrame_title}>填寫個人資料</div>
      <form onSubmit={handleSubmit}>
        <input
          className={printIfUserNameBlank()}
          type="text"
          placeholder={"姓名"}
          value={name}
          onChange={handleChangeName}
        />
        <div className={styles.loginContent_errorText}>{userNameBlankText}</div>
        <input
          className={printIfPhoneNumberBlank()}
          type="text"
          placeholder={"手機號碼"}
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
        />
        <div className={styles.loginContent_errorText}>
          {phoneNumberBlankText}
        </div>
        <input
          className={printIfEmailBlank()}
          type="text"
          placeholder={"電郵地址"}
          value={email}
          onChange={handleChangeEmail}
        />
        <div className={styles.loginContent_errorText}>{emailBlankText}</div>
        <input
          className={printIfAddressBlank()}
          type="text"
          placeholder={"郵寄地址"}
          value={address}
          onChange={handleChangeAddress}
        />
        <div className={styles.loginContent_errorText}>{addressBlankText}</div>
        <Link to="/">
          <input
            className={checkInputIsBlank()}
            type="submit"
            value="完成"
            disabled={isButtonDisable}
          />
        </Link>
      </form>
    </div>
  );
};

export default React.memo(NavItem);
