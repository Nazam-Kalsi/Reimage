import React from 'react'

type Props = {}

function NotFound({}: Props) {
  return (
    <div>NotFound
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/">Go to Home</a>
    </div>
  )
}

export default NotFound