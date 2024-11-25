"use client"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useEffect, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/src/schemas/signUpSchema"
import axios from "axios"


export default function Page () {

  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounce(username, 500)
  const {toast} = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      
    },
  })

  useEffect(() => {

    async function checkUsername() {
      if (debouncedUsername) {
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          const response = await axios.get(`/api/usernamecheck?username=${debouncedUsername}`)
        }
        catch (error) {}
      }
    }

  },[debouncedUsername])

  return (
    <div>
      Page
    </div>
  )
}