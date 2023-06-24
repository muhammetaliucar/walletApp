import React, { createContext, useState } from "react";
import { CalendarData } from "types";

const UserContext = createContext<UserContextInterface>({
  data: [],
  setData: () => {},
  currency: "",
  setCurrency: () => {},
});

interface Props {
  children: React.ReactNode;
}

interface UserContextInterface {
  data: CalendarData[];
  setData: React.Dispatch<React.SetStateAction<CalendarData[]>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export const UserFilterContext = UserContext;

export const UserProvider = ({ children }: Props) => {
  const [data, setData] = useState<CalendarData[]>([]);
  const [currency, setCurrency] = useState<string>("$");

  const values: UserContextInterface = {
    data,
    setData,
    currency,
    setCurrency,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
