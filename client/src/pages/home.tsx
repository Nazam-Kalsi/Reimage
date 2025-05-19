
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router";

type Props = {};

function Home({}: Props) {
  //   console.log("hello");
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
  //     credentials: "include",
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };


  return (
    <>
    
    <div>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> 
    </div>
    <Link to='/image-upload'>
    <Button>
    Upload Image
    </Button>
    </Link>
    </>
  );
}

export default Home;
