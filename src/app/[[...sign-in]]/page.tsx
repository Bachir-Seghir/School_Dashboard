'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LoginPage = () => {


    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        const role = user?.publicMetadata.role 
        
        if (role) {
            router.push(`/${role}`)
        }
    
      
    }, [user, router])
    
    return (
        <div className="h-screen flex justify-center items-center bg-sky-100">
            <SignIn.Root>
                <SignIn.Step name='start' className='bg-white rounded-md p-12 shadow-2xl flex flex-col gap-2'> 
                    <h1 className='text-xl font-bold flex items-center gap-2'>
                        <Image src="/logo.png" alt='' width={24} height={24}/>
                        School Management App
                    </h1>
                    <h1 className='text-gray-400'>Sign in to your account</h1>

                    <Clerk.GlobalError className='text-sm text-red-400'/>
                    <Clerk.Field name="identifier" className='flex flex-col gap-2'>
                        <Clerk.Label className='text-xs text-gray-400'>Username</Clerk.Label>
                        <Clerk.Input type='text' required className='p-2 rounded-md ring-1 ring-gray-300' />
                        <Clerk.FieldError className='text-sm text-red-400'/>
                    </Clerk.Field>
                    <Clerk.Field name="password" className='flex flex-col gap-2'>
                        <Clerk.Label className='text-xs text-gray-400'>Password</Clerk.Label>
                        <Clerk.Input type='password' required className='p-2 rounded-md ring-1 ring-gray-300' />
                        <Clerk.FieldError className='text-sm text-red-400'/>
                    </Clerk.Field>
                    <SignIn.Action className='bg-blue-500 text-white rounded-md tex-sm my-1 mx-auto p-2 w-[100px]' submit >Sign In</SignIn.Action>
                </SignIn.Step>
            </SignIn.Root>
        </div>
    )
}

export default LoginPage