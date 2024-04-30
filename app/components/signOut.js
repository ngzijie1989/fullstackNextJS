'use client'

import { signOut as signOutFunction } from "next-auth/react";

function SignOutComponent() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signOutFunction(); // Call the imported signIn function
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