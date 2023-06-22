import React, { createContext, useState } from "react";

const UserContext = createContext([]);

interface Props {
  children: React.ReactNode;
}

interface UserContextInterface {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export const UserFilterContext = createContext({} as UserContextInterface);

export const UserProvider = ({ children }: Props) => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("$");

  const values = {
    data,
    setData,
    currency,
    setCurrency,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
