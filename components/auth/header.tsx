import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const font = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
})

type Props = {
  label: string
}

const AuthHeader = ({ label }: Props) => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-y-4'>
      <h1 className={cn(
        "text-3xl font-semibold",
        font.className
      )}>Auth</h1>
      <p className='text-muted-foreground text-sm'>
        {label}
      </p>
    </div>
  )
}

export default AuthHeader