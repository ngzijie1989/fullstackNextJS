'use client'

import { signIn as signInFunction } from "next-auth/react";

function SignInNav() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInFunction(); // Call the imported signIn function
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