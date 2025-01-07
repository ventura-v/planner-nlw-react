import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";

import { Button } from "../../../components/button";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";

import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean,
    openGuestInput: () => void,
    closeGuestInput: () => void,
    setDestination: (destination: string) => void,
    eventStartAndEndDates: DateRange | undefined,
    setEventStartAndEndDates: (dates: DateRange | undefined) => void,
}

export function DestinationAndDateStep({
    isGuestInputOpen,
    openGuestInput,
    closeGuestInput,
    setDestination,
    eventStartAndEndDates,
    setEventStartAndEndDates,
}: DestinationAndDateStepProps) {

    const [isDatePickerOpen, setisDatePickerOpen] = useState(false);

    const openDatePicker = () => {
        setisDatePickerOpen(true);
    }
    
    const closeDatePicker = () => {
        setisDatePickerOpen(false);
    }

    const dispayedDate = 
        (eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to) ? 
            format(eventStartAndEndDates.from, `MMM d 'to '`)
                .concat(format(eventStartAndEndDates.to, `MMM d`))
        : 
            "When?";

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input 
                    disabled={isGuestInputOpen} 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <button 
                className="flex items-center gap-2 text-left flex-1"
                disabled={isGuestInputOpen}
                onClick={openDatePicker}
            >
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-40 flex-1">{dispayedDate}</span>
            </button>

            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Select the date</h2>
                                <button type="button" onClick={closeDatePicker}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <DayPicker
                            classNames={{
                                day_selected: "bg-lime-400 text-zinc-900",
                            }}                            
                            mode="range" 
                            selected={eventStartAndEndDates} 
                            onSelect={setEventStartAndEndDates}
                        />
                    </div>
                </div>
            )}





            <div className="w-px h-6 bg-zinc-800" />
            
            {isGuestInputOpen ? (
                <Button onClick={closeGuestInput} variant="secondary" size="higher">
                    Change place/date
                    <Settings2 className="size-5"/>
                </Button>
                ) : (
                <Button onClick={openGuestInput} variant="primary">
                    Next
                    <ArrowRight className="size-5"/>
                </Button>
            )}
        </div>
    )
}