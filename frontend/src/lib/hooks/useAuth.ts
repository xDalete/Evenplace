import { AuthContext } from "@/auth/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
