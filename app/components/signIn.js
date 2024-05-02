'use client'

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";


function SignInComponent() {
  const router = useRouter()
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signIn(undefined, { callbackUrl: "/"}); // Call the imported signIn function
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      <div className="flex flex-col">
      {/* <Link href="/login">
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </Link> */}

        <button className="mt-2  text-blue-600/100 hover:underline" onClick={()=> router.back()}>Go Back</button>
        </div>
    </div>
  );
}

export default SignInComponent;
