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
          const newTime = new Date(time.time);
          newTime.setHours(option.value + (time.period.value === "PM" ? 12 : 0));
          setTime({
            ...time,
            hour: option,
            time: newTime,
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
          const newTime = new Date(time.time);
          newTime.setMinutes(option.value);
          setTime({
            ...time,
            minute: option,
            time: newTime,
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
          const newTime = new Date(time.time);
          const currentHour = newTime.getHours();
          const newHour = option.value === "PM" ? currentHour + 12 : currentHour - 12;
          newTime.setHours(newHour);
          setTime({
            ...time,
            period: option,
            time: newTime,
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
