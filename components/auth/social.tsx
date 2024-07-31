"use client"

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'

type Props = {}

const AuthSocial = (props: Props) => {
  

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => console.log('Facebook')}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => console.log('Facebook')}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  )
}

export default AuthSocial