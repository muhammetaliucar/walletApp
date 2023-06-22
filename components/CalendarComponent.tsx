import { Dimensions } from "react-native";
import React, { useContext } from "react";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_COLOR, WHITE } from "../styles";
import UserContext from "../contexts/UserContext";
interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setYearVisible: React.Dispatch<React.SetStateAction<number>>;
}

const CalendarComponent = ({
  selected,
  setSelected,
  setSelectedMonth,
  setYearVisible,
}: Props) => {
  const navigation = useNavigation();

  const { data } = useContext(UserContext);

  const dates = data.map((item) => item.date);

  const handleMonthChange = (month: any) => {
    console.log(month);
    setSelectedMonth(month[0].dateString.split("-")[1]);
    setYearVisible(month[0].year);
  };
  return (
    <Calendar
      onVisibleMonthsChange={handleMonthChange}
      style={{
        borderWidth: 1,
        width: Dimensions.get("window").width * 0.9,
        borderRadius: 10,
        marginTop: 20,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
      }}
      firstDay={1}
      onDayPress={(day) => {
        setSelected(day.dateString);
        navigation.navigate("Details", {
          date: day.dateString,
        });
      }}
      monthFormat={"MMMM yyyy"}
      disableMonthChange={true}
      hideExtraDays={true}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: PRIMARY_COLOR,
          selectedTextColor: WHITE,
        },
        ...dates.reduce((obj, item) => {
          obj[item] = {
            marked: true,
            dotColor: PRIMARY_COLOR,
          };
          return obj;
        }, {}),
      }}
    />
  );
};

export default CalendarComponent;
