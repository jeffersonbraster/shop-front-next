import { useFormik } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { useMutation, useQuery } from '../../utils/graphql'

const UPDATE_CATEGORY = `
    mutation updateCategory($id: String!, $name: String!, $slug: String!){
      updateCategory(input: {
        id: $id,
        name: $name,
        slug: $slug
      }) {
        id
        name
        slug
      }
    }
  `

const Edit: NextPage = () => {
  const router = useRouter()
  const { data } = useQuery(`
  query {
    getCategoriesById(id: "${router.query.id}"){
      id
      name
    }
  }
  `)

  const [updatedData, updatedCategory] = useMutation(UPDATE_CATEGORY)

  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
    },
    onSubmit: async (values) => {
      const category = {
        ...values,
        id: router.query.id,
      }
      updatedCategory ? updatedCategory(category) : null
      router.push('/categories')
    },
  })

  //passando os dados para o formulario
  useEffect(() => {
    if (data && data.getCategoryById) {
      form.setFieldValue('name', data.getCategoryById.name)
      form.setFieldValue('slug', data.getCategoryById.slug)
    }
  }, [form])

  return (
    <Layout>
      <Title>Editar categoria</Title>
      <div className="mt-8"></div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <form onSubmit={form.handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={form.handleChange}
                value={form.values.name}
              />
              <input
                type="text"
                name="slug"
                onChange={form.handleChange}
                value={form.values.slug}
              />
              <button type="submit">Criar</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit
