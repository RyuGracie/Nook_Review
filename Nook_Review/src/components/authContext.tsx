import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  loginCont: () => void;
  logoutCont: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("username"),
  );

  const loginCont = () => {
    setUser(localStorage.getItem("username"));
  };

  const logoutCont = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginCont, logoutCont }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
