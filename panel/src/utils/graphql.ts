import { useState } from 'react'
import useSWR from 'swr'

const fetcher = async (query: any) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API!, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: query,
  })

  const json = await res.json()

  return json.data
}

const useQuery = (queryStr: any) => {
  const query = {
    query: queryStr,
  }
  return useSWR(JSON.stringify(query), fetcher)
}

const useMutation = (query: any) => {
  const [data, setData] = useState(null)
  const mutate = async (variables: any) => {
    const mutation = {
      query,
      variables,
    }
    try {
      const returnedData = await fetcher(JSON.stringify(mutation))
      setData(returnedData)
    } catch (error) {}
  }

  return [data, mutate]
}

export { useQuery, useMutation }
