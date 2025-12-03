import SignupContainer from "./SignupContainer";
//import SignupSideImage from "../Evento/SignupSideImage";
import styles from "./Signup.module.scss";

export default function Signup() {
  return (
    <div className={`${styles.signup}`}>
      <div>
        <SignupContainer />
      </div>
      <div className={`${styles.signupImageContainer}`}>
        {/* <SignupSideImage className={styles.signupImage} /> */}
      </div>
    </div>
  );
}