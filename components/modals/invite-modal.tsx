"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
    } from '@/components/ui/dialog' 
import { useModal } from '@/hooks/use-modal-store'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, Copy, RefreshCcw } from 'lucide-react'
import { useOrigin } from '@/hooks/use-origin'
import { useState } from 'react'
import { log } from 'console'
import axios from 'axios'


const InviteModal = () => {
    
    const {onOpen,isOpen,onClose,type,data}=useModal()
    const [copied,setCopied]=useState(false)
    const [isLoading,setLoading]=useState(false)
    
    const isModelOpen=isOpen && type==='invite'
    const {server}=data
    const origin =useOrigin()
    
    
    const inviteUrl=`${origin}/invite/${server?.inviteCode}`
    
    const onCopy=()=>{
      navigator.clipboard.writeText(inviteUrl)
      setCopied(true)

      setTimeout(()=>{
        setCopied(false)
      },1000)
    }

    const onNew=async()=>{
      try{
          setLoading(true)
         const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
         onOpen('invite',{server:response.data})
      } catch(error){
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    return (
    <Dialog open={isModelOpen} onOpenChange={onClose}> {/* can be written also as <Dialog open={false}>*/}
         <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6'>
              <DialogTitle className='text-2xl text-center font-bold'>
                 Invite your Friends
              </DialogTitle>
            </DialogHeader>
            <div className='p-6'>
             <Label className='uppercase text-xs font-bold
             text-zinc-500 dark:text-secondary/70'>
              Server Invite Link
             </Label>
               <div className='flex items-center mt-2 gap-x-2'>
                <Input disabled={isLoading} className='bg-zinc-300/50 border-0
                focus-visible:ring-0 text-black
                focus-visible:ring-offset-0'
                value={inviteUrl}
                />
                <Button disabled={isLoading} size="icon"
                 onClick={onCopy}
                >
                  {copied 
                  ?<Check className='w-4 h-4'/> 
                  :<Copy className='w-4 h-4'/>
                  }
                  
               </Button>  
             </div>
             <Button
             onClick={onNew}
             disabled={isLoading}
             variant="link"
             size="sm"
             className='text-xs text-zinc-500 mt-4'
             >
              Generate a new Link
              <RefreshCcw className='w-4 h-4 ml-2'/>
              </Button>   
            </div>
         </DialogContent>
    </Dialog>  
    );
}

export default  InviteModal;