import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Importants links</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">  {/* min-w-0 para o "truncate" funcionar */}
                        <span className="block font-medium text-zinc-100">
                            Hotel reservation
                        </span>
                        <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                            https://www.myhotel.com.br/rooms/ 765289419385938658236527652894193859386582365288
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0"> {/* min-w-0 para o "truncate" funcionar */}
                        <span className="block font-medium text-zinc-100">
                            Hotel reservation
                        </span>
                        <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                            https://www.myhotel.com.br/rooms/ 865823652765289419385938658236528876528941938593
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
            </div>

            <Button variant="secondary" size="full">
                <Plus className="size-5"/>
                Register new link
            </Button>
        </div>
    )
}