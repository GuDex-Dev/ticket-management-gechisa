import CustomSelect from "@/components/formsElements/CustomSelect";

function TimePicker({ value, onChange }) {
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
          onChange((prevTime) => ({
            ...prevTime,
            hour: option,
          }));
        }}
        value={value.hour}
      />
      <CustomSelect
        className="w-10"
        placeholder="00"
        options={minutes}
        onChange={(option) => {
          onChange((prevTime) => ({
            ...prevTime,
            minute: option,
          }));
        }}
        value={value.minute}
      />
      <CustomSelect
        className="w-12"
        placeholder="AM"
        options={periods}
        onChange={(option) => {
          onChange((prevTime) => ({
            ...prevTime,
            period: option,
          }));
        }}
        value={value.period}
      />
    </div>
  );
}

export default TimePicker;
