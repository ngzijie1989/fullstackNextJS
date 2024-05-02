'use client'

import { signIn as signInFunction } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignInNav() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInFunction(undefined, { callbackUrl: "/"}); // Call the imported signIn function
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInNav;