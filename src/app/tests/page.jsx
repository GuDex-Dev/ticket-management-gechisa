"use client";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TestsPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Selecciona Fecha y Hora</h1>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Selecciona fecha y hora"
        className="w-full rounded border p-2"
      />
    </div>
  );
}

export default TestsPage;
