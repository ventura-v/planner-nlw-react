import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestModal } from "./invite-guest-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-stes"
import { InviteGuestsStep } from "./steps/invite-guests-step"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
  const [emailsToInvite, setEmailsToInvite] = useState([
    "deveras-ventura@ventechdigital.com",
    "ventura@ventechdigital.com.br",
  ]);

  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const openGuestInput = () => {
    setIsGuestInputOpen(true)
  }

  const closeGuestInput = () => {
    setIsGuestInputOpen(false)
  }

  const openGuestModal = () => {
    setIsGuestModalOpen(true)
  }

  const closeGuestModal = () => {
    setIsGuestModalOpen(false)
  }

  const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get("email")?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite, 
      email
    ])

    event.currentTarget.reset()
  }

  const removeEmailFromInvites = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true)
  }

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false)
  }

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    console.log(destination)
    console.log(ownerName)
    console.log(ownerEmail)
    console.log(eventStartAndEndDates)
    console.log(emailsToInvite)

    if (
        !destination || 
        !ownerName || 
        !ownerEmail || 
        !eventStartAndEndDates?.from || 
        !eventStartAndEndDates?.to || 
        emailsToInvite.length === 0
    ){ 
      return 
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      owner_name: ownerName,
      owner_email: ownerEmail,
      emails_to_invite: emailsToInvite
    })
    
    const { tripId } = response.data
    
    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep 
            closeGuestInput={closeGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            openGuestInput={openGuestInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestInputOpen && (
            <InviteGuestsStep 
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestModal={openGuestModal}
            />
          )}

        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er, você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>
        </p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestModal 
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={closeGuestModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}

    </div>
  )
}