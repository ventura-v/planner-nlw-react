import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
    closeCreateActivityModal,
}: CreateActivityModalProps) {
    const { tripId } = useParams();

    const createActivity = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const title = data.get("title")?.toString()
        const occurs_at = data.get("occurs_at")?.toString()
        
        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at,
        })

        window.document.location.reload()
    }

    return (
        <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
            <div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Register activity</h2>
                        <button type="button" onClick={closeCreateActivityModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">
                        All guests can view the activities.
                    </p>
                </div>

                <form onSubmit={createActivity} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-5" />
                        <input 
                            name="title" 
                            placeholder="What is the activity?" 
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                        />
                    </div>
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Calendar className="text-zinc-400 size-5" />
                        <input 
                            type="datetime-local"
                            name="occurs_at" 
                            placeholder="Date and hour of the activity" 
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                            style={{ colorScheme: "dark" }}
                        />
                    </div>

                    <Button size="full">
                        Save activity
                    </Button>
                </form>
            </div>
        </div>
    )
}