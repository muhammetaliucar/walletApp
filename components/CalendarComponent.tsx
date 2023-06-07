import { Dimensions } from "react-native";
import React, { useContext } from "react";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_COLOR, WHITE } from "../styles";
interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const CalendarComponent = ({
  selected,
  setSelected,
  setSelectedMonth,
  selectedMonth,
}: Props) => {
  const navigation = useNavigation();

  const handleMonthChange = (month: any) => {
    setSelectedMonth(month[0].dateString.split("-")[1]);
  };
  return (
    <Calendar
      onVisibleMonthsChange={handleMonthChange}
      style={{
        width: Dimensions.get("window").width,
        marginBottom: 20,
      }}
      onDayPress={(day) => {
        setSelected(day.dateString);
        navigation.navigate("Details", {
          date: day.dateString,
        });
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: PRIMARY_COLOR,
          selectedTextColor: WHITE,
        },
      }}
    />
  );
};

export default CalendarComponent;
