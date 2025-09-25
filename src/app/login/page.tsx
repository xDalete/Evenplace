import LoginContainer from "@/app/login/components/LoginContainer";
import LoginSideImage from "@/app/login/components/LoginSideImage";
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
