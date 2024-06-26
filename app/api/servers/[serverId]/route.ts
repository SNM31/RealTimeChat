import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{parmas}:{parmas:{serverId:string}}){
    try{
      const profile = await currentProfile()
      const {name,imageUrl}=await req.json()
      if(!profile) return new NextResponse("Unauthorized",{status:401})
      
      const server =await db.server.update({
        where:{
            id:parmas.serverId,
            profileId: profile.id,
        },
        data:{
           name,
           imageUrl
        }
      })  
      return NextResponse.json(server)
    }catch(error){
      console.log("[Server_ID:PATCH ]")
      return new NextResponse("Internal Server Error",{status:500})        
    }
}