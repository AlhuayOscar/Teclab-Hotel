"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { es, enUS } from "date-fns/locale";
interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    const localeFromUrl = urlParts[3];
    const locale = localeFromUrl === "es" || localeFromUrl === "en" ? es : enUS;
    //Estás funciones deterioran la performance, Limitarse.
  return (
    <DateRange
      rangeColors={["#ad8b33"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      locale={locale}
    />
  );
};

export default DatePicker;
