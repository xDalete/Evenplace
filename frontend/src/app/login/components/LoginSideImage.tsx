import Image from "next/image";

import Container from "@/components/common/Container";

import styles from "./LoginSideImage.module.scss";

export default function Login() {
  return (
    <Container className={styles.loginImage}>
      <Image alt="Logo" height={64} src={"/vercel.svg"} width={64} />
      <h1>Evenplace</h1>
    </Container>
  );
}
