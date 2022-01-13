import { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'

const fetcher = async (query: any) => {
  const res = await fetch('http://localhost:3000/graphql', {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: query,
  })

  const json = await res.json()

  return json.data
}

const query = {
  query: `
    query{
      getAllCategories{
        id
        name
        slug
      }
    }
  `,
}

const Category: NextPage = () => {
  const { data, error } = useSWR(JSON.stringify(query), fetcher)

  console.log(data, error)

  return <div></div>
}

export default Category
