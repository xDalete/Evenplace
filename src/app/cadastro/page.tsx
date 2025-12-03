import SignupContainer from "../../components/SignupContainer/SignupContainer";
import styles from "./Cadastro.module.scss";

export default function Cadastro() {
  return (
    <div className={styles.signupPage}>
      <div>
        <SignupContainer />
      </div>
      <div className={styles.imageSide}>{/* Imagem lateral aqui */}</div>
    </div>
  );
}
