
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { Link, useNavigate } from "react-router";

function Home() {
  //   console.log("hello");
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
  //     credentials: "include",
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userSlice.user);
  if(user){
    navigate('/dashboard');
  }


  return (
    <>
    <Link to='/sign-in'>
    <Button>
    sign in
    </Button>
    </Link>
    </>
  );
}

export default Home;
