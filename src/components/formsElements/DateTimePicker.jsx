"use client";
import React, { useState, useMemo, useEffect } from "react";

import TimePicker from "@/components/formsElements/TimePicker";
import DatePicker from "@/components/formsElements/DatePicker";

function DateTimePicker({ className, onChange }) {
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
    time: now,
  });

  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    if (onChange) {
      const dateTime = new Date(date);
      const hours =
        time.period.value === "PM" ? time.hour.value + 12 : time.hour.value;
      dateTime.setHours(hours, time.minute.value);
      onChange(dateTime);
      console.log("cambiando");
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
