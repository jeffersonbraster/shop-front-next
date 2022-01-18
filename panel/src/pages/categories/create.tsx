import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { useMutation } from '../../utils/graphql'
import Input from '../../components/Input'

const CREATE_CATEGORY = `
    mutation createCategory($name: String!, $slug: String!){
      createCategory(input: {
        name: $name,
        slug: $slug
      }) {
        id
        name
        slug
      }
    }
  `

const Create = () => {
  const [data, createCategory] = useMutation(CREATE_CATEGORY)
  const router = useRouter()

  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
    },
    onSubmit: async (values) => {
      createCategory ? createCategory(values) : null
      router.push('/categories')
    },
  })

  return (
    <Layout>
      <Title>Criar categorias</Title>
      <div className="mt-8"></div>
      <div>
        <Button.LinkOutline href="/categories">Voltar</Button.LinkOutline>
      </div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full bg-white shadow overflow-hidden sm:rounded-lg border-b border-gray-200 p-12">
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
              <Button>Criar categoria</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
