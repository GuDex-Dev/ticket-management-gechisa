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
          setTime({
            ...time,
            hour: option,
          });
        }}
        value={time.hour}
        defaultValue={() => {
          const currentHour = new Date().getHours();
          const displayHour = currentHour % 12 || 12;
          return { value: displayHour, label: displayHour.toString() };
        }}
      />
      <CustomSelect
        className="w-10"
        placeholder="00"
        options={minutes}
        onChange={(option) => {
          setTime({
            ...time,
            minute: option,
          });
        }}
        value={time.minute}
        defaultValue={() => {
          const currentMinute = new Date().getMinutes();
          return {
            value: currentMinute,
            label: currentMinute.toString().padStart(2, "0"),
          };
        }}
      />
      <CustomSelect
        className="w-12"
        placeholder="AM"
        options={periods}
        onChange={(option) => {
          setTime({
            ...time,
            period: option,
          });
        }}
        value={time.period}
        defaultValue={() => {
          const currentPeriod = new Date().getHours() >= 12 ? "PM" : "AM";
          return { value: currentPeriod, label: currentPeriod };
        }}
      />
    </div>
  );
}

export default TimePicker;
