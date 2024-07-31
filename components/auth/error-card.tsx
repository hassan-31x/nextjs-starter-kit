import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import CardWrapper from '@/components/auth/card-wrapper'

type Props = {}

const ErrorCard = (props: Props) => {
  return (
    <CardWrapper
      headerLabel='Something went wrong!'
      backButtonhref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard