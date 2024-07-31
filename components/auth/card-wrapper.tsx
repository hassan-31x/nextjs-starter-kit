"use client"

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AuthHeader from './header';
import AuthSocial from './social';
import BackButton from './back-button';

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonhref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonhref,
  showSocial = false,
}: Props) => {

  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <AuthSocial />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonhref} />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper