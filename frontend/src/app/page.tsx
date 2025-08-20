"use client"

import { useEffect, useState } from "react"

type data = {
  message: string;
}

export default function Home() {
  const [data, setData] = useState("")


  const backend_url = process.env.NEXT_PUBLIC_BACKEND_API_URL
  useEffect(() => {
      const get_data = async () => {
        const response = await fetch(`${backend_url}/api`)
        if (!response.ok) {
          console.log(response)
        }
        const data: data = await response.json()
        setData(data.message)
      }
      get_data()
  }, [])

  return (
    <div>
      <h1>Twitter拡張機能</h1>
      <h2>バックエンドデータ</h2>
      { data }
    </div>

  )
}