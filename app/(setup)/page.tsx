import { InitialProfile } from "@/lib/intial-profile";
import {db} from "@/lib/db"
import { redirect } from "next/navigation";
import IntialModal from "@/components/modals/intial-modal";
const SetupPage = async() => {
    const profile= await InitialProfile()
    if(typeof profile === 'object' && profile !== null && 'id' in profile)
    {
    const server= await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    });

    if(server) return redirect(`/servers/${server.id}`)

      return <IntialModal/>
}
 
   
}
 
export default SetupPage;