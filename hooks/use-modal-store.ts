import { Server } from '@prisma/client'
import {create} from 'zustand'
export type ModalType='createServer' | 'invite' | 'editServer'

interface MoadalData{
        server?:Server
}
interface ModalStore{
    type:ModalType|null
    data:MoadalData
    isOpen:boolean
    onOpen:(type:ModalType,data?:MoadalData)=>void
    onClose:()=>void
}
export const useModal=create<ModalStore>((set)=>(
    {
        type:null,
        data:{},
        isOpen:false,
        onOpen:(type,data={})=>set({isOpen:true,type,data}),
        onClose:()=>set({isOpen:false,type:null})
    }
))