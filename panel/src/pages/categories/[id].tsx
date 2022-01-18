import { useFormik } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
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
    getCategoryById(id: "${router.query.id}"){
      name
      slug
    }
  }
  `)

  console.log(data)

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
  }, [data])

  return (
    <Layout>
      <Title>Editar categoria</Title>
      <div className="mt-8"></div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow bg-white p-12 overflow-hidden sm:rounded-lg border-b border-gray-200">
            <form onSubmit={form.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Input
                  label="Nome da categoria"
                  placeholder="Preencha com o nome da categoria"
                  value={form.values.name}
                  onChange={form.handleChange}
                  name="name"
                />
                <Input
                  label="Slug da categoria"
                  placeholder="Preencha com o slug da categoria"
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name="slug"
                  helpText="Slug é utilizado para URLs amigáveis."
                />
              </div>
              <Button>Editar</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit
