import { Noise, ThemeToggler } from "@/components/customComponents";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { LucideDog } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userSlice.user);
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div>
      {/* Header */}
      <div className="z-[99] flex justify-between items-center rounded-md px-4 py-2 w-11/12 sticky mx-auto top-6 bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border">
        <div className="flex gap-1">
          <LucideDog /> Reimage
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="ghost">Sign up</Button>
          </Link>
          <ThemeToggler />
        </div>
      </div>
      <img
        src={`./src/assets/grad1.svg`}
        alt="svg"
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40 hidden dark:block"
      />
     <Noise/>
      <div className="h-[90vh] flex justify-center items-center">
        <div className="w-3/4 text-center">
          <h2 className="text-8xl text-center font-bold leading-28">
            <span className="text-violet-600 relative z-[99]">Reimage&nbsp;</span>
            you <br />Images and Videos
          </h2>
          <p className="mt-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
            placeat aliquam, debitis rem adipisci accusantium, quos deleniti
          </p>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Home;
