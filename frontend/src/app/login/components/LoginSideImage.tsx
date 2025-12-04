import Container from "@/components/common/Container";
import styles from "./LoginSideImage.module.scss";
import Image from "next/image";

export default function Login() {
  return (
    <Container className={styles.loginImage}>
      <Image src={"/vercel.svg"} alt="Logo" width={64} height={64} />
      <h1>Evenplace</h1>
    </Container>
  );
}
