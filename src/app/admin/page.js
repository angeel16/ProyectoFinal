import { auth } from "@/auth"
import { redirect } from "next/navigation"

async function page() {
  const sesion = await auth()

  if (sesion?.user.role !== 'ADMIN')
    redirect('/dashboard')

  return (
    <>
      <h1> 🔐  Admin panel</h1>
      <p> {sesion?.user.name}</p>
      <p> {sesion?.user.email} </p>
      <p> {sesion?.user.role} </p>
      <img src={sesion?.user.image}></img>
    </>
  )
}

export default page