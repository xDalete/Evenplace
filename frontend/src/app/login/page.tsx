import LoginSideImage from "@/app/login/components/LoginSideImage";

import LoginContainer from "./components/LoginContainer";
import styles from "./Login.module.scss";

export default function Login() {
  return (
    <div className={`${styles.login}`}>
      <div>
        <LoginContainer />
      </div>
      <div className={`${styles.loginImageContainer}`}>
        <LoginSideImage />
      </div>
    </div>
  );
}
