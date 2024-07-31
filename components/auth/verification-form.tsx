"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { LoaderCircle } from "lucide-react"

import CardWrapper from "@/components/auth/card-wrapper"
import { verifyEmail } from "@/actions/verify-email"
import FormSuccess from "@/components/form-success"
import FormError from "@/components/form-error"

type Props = {}

const VerificationForm = (props: Props) => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = useCallback(() => {
    if (!token) {
      setError("Token missing")
      return
    }

    verifyEmail(token)
    .then((data) => {
      setError(data.error)
      setSuccess(data.success)
    })
    .catch(() => {
      setError("Something went wrong")
    })
  }, [token])

  useEffect(() => {
    handleSubmit()
  }, [])
  return (
    <CardWrapper
      headerLabel="Confirm your email"
      backButtonLabel="Back to login"
      backButtonhref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <LoaderCircle className="animate-spin" />}
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}

export default VerificationForm