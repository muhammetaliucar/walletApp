import React, { createContext, useState } from "react";

const UserContext = createContext([]);

interface Props {
  children: React.ReactNode;
}

interface CalendarData {
  createdAt: number;
  date: string;
  description: string;
  id: number;
  total: number;
  type: string;
}

interface UserContextInterface {
  data: CalendarData[];
  setData: React.Dispatch<React.SetStateAction<CalendarData[]>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export const UserFilterContext = createContext({} as UserContextInterface);

export const UserProvider = ({ children }: Props) => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("$");

  console.log(data);

  const values = {
    data,
    setData,
    currency,
    setCurrency,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
