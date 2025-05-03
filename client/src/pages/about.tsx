import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router'

type Props = {}

function About({}: Props) {
  const sendReq = async()=>{
    console.log("hello")      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
  }
  return (
    <div>About
      <Button onClick={sendReq}>
      home
      </Button>
    </div>
  )
}

export default About