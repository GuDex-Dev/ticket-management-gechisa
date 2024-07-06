import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
function DatePicker({ date, setDate }) {
  useAppContext();

  return (
    <Popover className="w-36">
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-36 justify-start text-left font-normal md:text-base ${!date ? "text-muted-foreground" : ""}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd/MM/yyyy")
          ) : (
            <span>Selecciona</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar selected={date} mode="single" onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
