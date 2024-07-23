"use client"

import React from 'react'
import { Card } from '@/components/ui/card';

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
  showSocial = true,
}: Props) => {
  return (
    <Card className='w-[400px]'>

    </Card>
  )
}

export default CardWrapper