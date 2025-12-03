import Container from "@/components/common/Container";
import styles from "./SignupContainer.module.scss";
import SignupForm from "./SignupForm";

export default function SignupContainer() {
  return (
    <Container className={styles.signupContainer}>
      <div className={`${styles.signupHeader}`}>
        <h1>Crie sua Conta</h1>
        <h2>Junte-se a milhares de pessoas descobrindo eventos incríveis</h2>
      </div>
      <SignupForm />
      <div>
        <div className={`${styles.signupFooter}`}>
          <p>© 2025 TODOS OS DIREITOS RESERVADOS</p>
        </div>
      </div>
    </Container>
  );
}