import CustomSelect from "@/components/formsElements/CustomSelect";

function TimePicker({ time, setTime }) {
  const hours = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));
  const minutes = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, "0"),
  }));
  const periods = ["AM", "PM"].map((p) => ({ value: p, label: p }));

  return (
    <div className="flex">
      <CustomSelect
        className="w-10"
        placeholder="00"
        options={hours}
        onChange={(option) => {
          setTime((prevTime) => ({
            ...prevTime,
            hour: option,
          }));
        }}
        value={time.hour}       
      />
      <CustomSelect
        className="w-10"
        placeholder="00"
        options={minutes}
        onChange={(option) => {
          setTime((prevTime) => ({
            ...prevTime,
            minute: option,
          }));
        }}
        value={time.minute}
      />
      <CustomSelect
        className="w-12"
        placeholder="AM"
        options={periods}
        onChange={(option) => {
          setTime((prevTime) => ({
            ...prevTime,
            period: option,
          }));
        }}
        value={time.period}
      />
    </div>
  );
}

export default TimePicker;
