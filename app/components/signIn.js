'use client'

import { signIn as signInFunction } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignInComponent() {
  const router = useRouter()
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInFunction(); // Call the imported signIn function
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
        <button className="mt-2  text-blue-600/100 hover:underline" onClick={()=> router.back()}>Go Back</button>
    </div>
  );
}

export default SignInComponent;
