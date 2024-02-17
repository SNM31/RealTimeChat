import { InitialProfile } from "@/lib/intial-profile";
import {db} from "@/lib/db"
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
}
    return <div>Create A Server</div>;
}
 
export default SetupPage;