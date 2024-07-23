import React from 'react'
import CardWrapper from './card-wrapper'

type Props = {}

const LoginForm = (props: Props) => {
  return (
    <CardWrapper
      headerLabel='Welcome Back!'
      backButtonLabel='Don’t have an account?'
      backButtonhref='/auth/register'
      showSocial
    >LoginForm</CardWrapper>
  )
}

export default LoginForm