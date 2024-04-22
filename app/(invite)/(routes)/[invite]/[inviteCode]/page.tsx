import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface InviteCodePageProps{
  parmas:{
    inviteCode:string
  }  
}
export const  InviteCodePage=async ({parmas}:InviteCodePageProps)=>{
    const profile =await currentProfile()
    if(!profile) return redirectToSignIn

    if(!parmas.inviteCode) return redirect("/")

    const existingUser=await db.server.findFirst(
       { where: {
            inviteCode:parmas.inviteCode,
            members:{
                some:{
                   profileId:profile?.id
                }
            }
        }
    }
    )
    if(existingUser) redirect(`servers/${existingUser.id}}`)
        
    const server=await db.server.update({
        where :{
            inviteCode:parmas.inviteCode
        },
        data:{
            members:{
                create:[
                    {
                        profileId:profile.id,
                        
                    }
                ]
            }
        }
    })  
    
    if(server) return redirect(`server/${server.id}`)
        
   return null
}
export default InviteCodePage