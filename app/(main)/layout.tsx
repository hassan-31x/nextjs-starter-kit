import React from 'react'
import Navbar from './_components/navbar'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className='h-full w-full flex items-center justify-center gap-y-10'>
        <Navbar />
        {children}
    </div>
  )
}

export default MainLayout