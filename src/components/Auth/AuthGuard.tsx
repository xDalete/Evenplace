"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Loading from "../common/Loading";
import Container from "../common/Container";
import styles from "./AuthGuard.module.scss";

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && pathname.includes("/dashboard")) {
      //router.push("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading)
    return (
      <Container className={styles.container}>
        <Loading size={48} />
      </Container>
    );

  if (!user && pathname.includes("dashboard")) return null;

  return <>{children}</>;
};

export default AuthGuard;
