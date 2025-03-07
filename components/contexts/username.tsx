import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  ReactNode,
  ReactElement,
} from "react";

type UserContextType = {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function useAuth(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const UserProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<string | null>(null);

  return <UserContext.Provider {...props} value={{ user, setUser }} />;
};

export { UserProvider, useAuth };
