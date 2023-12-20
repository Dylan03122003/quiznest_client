import { SignUp } from '@clerk/clerk-react'

export default function SignUpTest() {
  return (
    <div className="flex items-center justify-center pt-20">
      <SignUp routing="path" path="/register" />
    </div>
  )
}
