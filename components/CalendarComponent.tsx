import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Calendar } from "react-native-calendars";
interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const CalendarComponent = ({ selected, setSelected }: Props) => {
  return (
    <Calendar
      onVisibleMonthsChange={(months) => {
        console.log("now these months are visible", months);
      }}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.4,
      }}
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: false,
        },
      }}
    />
  );
};

export default CalendarComponent;
