import { InitialProfile } from "@/lib/intial-profile";
import {db} from "@/lib/db"
import { redirect } from "next/navigation";
import IntialModal from "@/components/modals/intial-modal";
const SetupPage = async() => {
    const profile= await InitialProfile()
  if(typeof profile!=='function'){ 
    console.log("Entered");
    console.log(profile)
    const server = await db.server.findFirst({
        where: {
          members: {
            some: {
              profileId: profile.id
            }
          }
        }
      });
    console.log(server)
      if (server) {
        console.log('Server is valid')
        return redirect(`/servers/${server.id}`);
      }

      return <IntialModal/>
}
}
 
export default SetupPage;