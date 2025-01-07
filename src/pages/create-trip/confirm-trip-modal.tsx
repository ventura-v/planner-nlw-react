import { FormEvent } from "react";
import { Mail, User, X } from "lucide-react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void,
  createTrip: (event: FormEvent<HTMLFormElement>) => void,
  setOwnerName: (name: string) => void,
  setOwnerEmail: (email: string) => void,
  destination: string,
  eventStartDate: string | undefined,
  eventEndDate: string | undefined,
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  destination,
  eventStartDate,
  eventEndDate
}: ConfirmTripModalProps) {

  return (
      <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
        <div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Confirm trip creation</h2>
              <button type="button" onClick={closeConfirmTripModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              To complete the creation of the trip to <span className="text-zinc-100 font-semibold">{destination}</span> from <span className="text-zinc-100 font-semibold">{eventStartDate} to {eventEndDate}</span> please fill in your details below:
            </p>
          </div>

          <form onSubmit={createTrip} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="text-zinc-400 size-5" />
                <input 
                  name="name" 
                  placeholder="Your full name" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  onChange={event => setOwnerName(event.target.value)} 
                />
            </div>

            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="text-zinc-400 size-5" />
              <input 
                type="email"
                name="email" 
                placeholder="Your personal email" 
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                onChange={event => setOwnerEmail(event.target.value)}
              />
            </div>

            <Button type="submit" variant="primary" size="full">
              Confirm trip creation
            </Button>
          </form>

        </div>
      </div>
  )
}