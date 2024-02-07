import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  return (<>
    <div>
      {redirect("/leads")}
    </div>
  </>)
}

export default page
