import { Outlet } from 'react-router'
import { ThemeToggler } from './components/customComponents'

function App() {
  return (
    <>
    <ThemeToggler/>
      <Outlet/>
    </>
  )
}

export default App
