"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/lib/hooks/useAuth";

import Container from "../common/Container";
import Loading from "../common/Loading";
import styles from "./AuthGuard.module.scss";

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { loading, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && pathname.includes("/dashboard")) {
      router.push("/login");
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
