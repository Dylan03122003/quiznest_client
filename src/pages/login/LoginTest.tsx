import { SignIn } from '@clerk/clerk-react'

export default function LoginTest() {
  return (
    <div className="flex items-center justify-center pt-20">
      <SignIn routing="path" path="/sign-in" />
    </div>
  )
}
