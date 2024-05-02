'use client'

import { signOut } from "next-auth/react";
// import { useRouter } from 'next/navigation'
// import { useSession } from "next-auth/react";

function SignOutComponent() {

  // const router = useRouter()
  // const session = useSession()

  // const SessionCheck = async () => {
  //   if (!session) {
  //     await router.push('/')
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signOut({ callbackUrl: '/' }); // Call the imported signIn function
    // await SessionCheck();
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}

export default SignOutComponent;