import Container from "@/components/common/Container";
import styles from "./LoginContainer.module.scss";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Container className={styles.loginContainer}>
      <div className={`${styles.loginHeader}`}>
        <h1>Evenplace</h1>
        <h2>Bem-vindo de volta!</h2>
      </div>
      <LoginForm />
      <div>
        <div className={`${styles.loginFooter}`}>
          <p>© 2025 TODOS OS DIREITOS RESERVADOS</p>
        </div>
      </div>
    </Container>
  );
}
