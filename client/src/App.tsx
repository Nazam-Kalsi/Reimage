import { Outlet } from 'react-router'
import { ThemeToggler } from './components/customComponents'

function App() {
  return (
    <>
    <ThemeToggler className='absolute top-5 left-5'/>
      <Outlet/>
    </>
  )
}

export default App
