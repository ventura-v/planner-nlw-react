import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
interface Activity {
    "date": string,
    "activities": {
        "id": string,
        "title": string,
        "occurs_at": string,
    }[],
}

export function Activities() {
    const { tripId } = useParams();
    const [activities, setActivities] = useState<Activity[]>([])
    
    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => { setActivities(response.data.activities) })
    }, [tripId])
    
    return (
        <div className="space-y-8">
            {activities.map(category => (
                <div className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-zinc-300 font-semibold">{ format(category.date, 'd') }</span>
                        <span className="text-xs text-zinc-500">{format(category.date, 'EEEE')}</span>
                    </div>

                    {category.activities.map(activity => (
                        <div className="space-y-2.5">
                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                            <CircleCheck className="sixe-5 text-lime-300" />
                            <span className="text-zinc-100">{activity.title}</span>
                            <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, 'hh:mm a')}</span>
                        </div>
                    </div>
                    ))}
                </div>
            ))}
            
        </div>
    )
}