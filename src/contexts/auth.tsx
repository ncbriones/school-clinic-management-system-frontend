import { getAuthSession } from "@/utils/auth.helper";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type AuthSession = {
  token: string;
  role: string;
  name: string;
};

type AuthContextState = AuthSession & {
  setAuthSession: (action: React.SetStateAction<AuthSession>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession>(() => getAuthSession());

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setSession({ token: "", role: "", name: "" });
  };

  const contextValue: AuthContextState = {
    ...session,
    setAuthSession: setSession,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
