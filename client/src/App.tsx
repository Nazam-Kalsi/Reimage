import { Outlet } from 'react-router'
import { ThemeToggler } from './components/customComponents'
import { useEffect } from 'react'
import { apiHandler } from './lib/apiHandler';
import { useAppDispatch } from './store/store';
import { signIn } from './store/user.slice';
import { Toaster } from "@/components/ui/sonner"
 

function App() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    ;(async()=>{
      const res = await apiHandler('/auth/current-user','get');
      if(!res.success) {
        dispatch(signIn(null));

        return;}
      console.log(res);
      const dataToDispatch = {
        id:(res.res as any).data.data.id,
        userName: (res.res as any).data.data.username,
        email: (res.res as any).data.data.emailAddresses[0].emailAddress,
        avatar:(res.res as any).data.data.imageUrl
      }
      dispatch(signIn(dataToDispatch));
    })();
  },[])
  return (
    <>
    <ThemeToggler className='absolute top-5 right-5 z-10'/>
      <Outlet/>
    <Toaster richColors/>
    </>
  )
}

export default App
