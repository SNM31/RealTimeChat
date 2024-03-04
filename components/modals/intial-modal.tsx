"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
    } from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import { Button } from '@/components/ui/button'    
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { log } from 'console'

const formSchema=z.object({
    name:z.string().min(1,{
        message:"Server name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"Server image is required"
    })
})
const IntialModal = () => {
    const form =useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:""
        }
    })
    const isLoading =form.formState.isSubmitting
    const onSubmit= async(values:z.infer<typeof formSchema>)=>{
       console.log(values);
       
    }
    return (
    <Dialog open> {/* can be written also as <Dialog open={false}>*/}
         <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6'>
              <DialogTitle className='text-2xl text-center font-bold'>
                 Customize Your Server!
              </DialogTitle>
              <DialogDescription className='text-center text-zinc-500'>
               Give your server personality with name and profile image.You can always change it later
              </DialogDescription>
            </DialogHeader>
         </DialogContent>
    </Dialog>  
    );
}
 
export default IntialModal;