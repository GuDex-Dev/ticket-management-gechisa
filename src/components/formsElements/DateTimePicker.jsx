"use client";
import React, { useState, useMemo, useEffect } from "react";

import TimePicker from "@/components/formsElements/TimePicker";
import DatePicker from "@/components/formsElements/DatePicker";

function DateTimePicker({ className, onChange, value }) {
  const now = useMemo(() => new Date(new Date().setSeconds(0, 0)), []);
  const initialDate = useMemo(
    () => new Date(new Date().setHours(0, 0, 0, 0)),
    [],
  );

  const [time, setTime] = useState({
    hour: { value: now.getHours(), label: now.getHours().toString() },
    minute: { value: now.getMinutes(), label: now.getMinutes().toString() },
    period: {
      value: now.getHours() < 12 ? "AM" : "PM",
      label: now.getHours() < 12 ? "AM" : "PM",
    },
  });

  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    if (value) {
      const dateTime = new Date(value);

      const actualDateTime = new Date(date);
      const hours =
        time.period.value === "PM" ? time.hour.value + 12 : time.hour.value;
      actualDateTime.setHours(hours, time.minute.value);

      if (dateTime.getTime() === actualDateTime.getTime()) return;

      console.log("nueva fecha y hora: " + dateTime);
      const currentHour = dateTime.getHours();
      const displayHour = currentHour % 12 || 12;

      const currentMinute = dateTime.getMinutes();

      const currentPeriod = currentHour >= 12 ? "PM" : "AM";

      console.log(
        "currentHour: " + currentHour,
        "displayHour: " + displayHour,
        "currentMinute: " + currentMinute,
        "currentPeriod: " + currentPeriod,
      )

      setTime({
        hour: {
          value: currentHour,
          label: displayHour.toString(),
        },
        minute: {
          value: currentMinute,
          label: currentMinute.toString(),
        },
        period: {
          value: currentPeriod,
          label: currentPeriod,
        },
      });
      setDate(new Date(dateTime.setHours(0, 0, 0, 0)));
    }
  }, [value]);

  useEffect(() => {
    if (onChange) {
      const dateTime = new Date(date);
      const hours =
        time.period.value === "PM" ? time.hour.value + 12 : time.hour.value;
      dateTime.setHours(hours, time.minute.value);
      onChange(dateTime);
    }
  }, [date, time]);

  return (
    <div className={className}>
      <DatePicker date={date} setDate={setDate} />
      <TimePicker time={time} setTime={setTime} />
    </div>
  );
}

export default DateTimePicker;
