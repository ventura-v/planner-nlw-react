import { useState } from "react";
import { Calendar, MapPin, Plus, Settings2} from "lucide-react";
import { CreateActivityModal } from "./create-activity-modal";
import { Activities } from "./activities";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";


export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

    const openCreateActivityModal = () => {
        setIsCreateActivityModalOpen(true);
    }

    const closeCreateActivityModal = () => {
        setIsCreateActivityModalOpen(false);
    }

    return (
        <div className="max-w-6xl mx-auto py-10 px-6 space-y-8">
            <div className="flex items-center justify-between px-4 bg-zinc-900 h-16 rounded-xl shadow-shape">
                <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">Florianópolis, Brasil</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-zinc-400" />
                        <span className="text-zinc-100">17 a 23 de Agosto</span>
                    </div>

                    <div className="w-px h-6 bg-zinc-800" />

                    <button 
                        className="bg-zinc-800 text-zinc-200 rounded-lg px-3 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
                    >
                        Alterar local/data
                        <Settings2 className="size-5"/>
                    </button>
                </div>
            </div>

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <button 
                            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                            onClick={openCreateActivityModal}
                        >
                            <Plus className="size-5"/>
                            Cadastrar atividade
                        </button>
                    </div>
                    
                    <Activities />
                </div>

                <div className="w-80 space-y-6">
                    <ImportantLinks />

                    <div className="w-full h-px bg-zinc-800" />

                    <Guests />
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    closeCreateActivityModal={closeCreateActivityModal}
                />
            )}
        </div>
    )
}