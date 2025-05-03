import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

type Props = {}

function Home({}: Props) {

  const sendReq = async()=>{
    console.log("hello")
    const res = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
      credentials: "include",
    });
        const data = await res.json();
    console.log(data);
  }

  return (
    <div>
       <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
         {/* <Link to={'/about'}> */}
      <Button onClick={sendReq}>
      about
      </Button>
      {/* </Link> */}
    </div>
  )
}

export default Home