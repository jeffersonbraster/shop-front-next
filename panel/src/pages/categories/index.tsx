import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Title from '../../components/Title'
import { useQuery } from '../../utils/graphql'

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

const Index: NextPage = () => {
  const { data, error } = useQuery(query)

  return (
    <Layout>
      <Title>Gerenciar categorias</Title>
      <div className="mt-8"></div>
      <div>
        <Button.Link href="/categories/create">Criar categoria</Button.Link>
      </div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {data && data.getAllCategories && data.getAllCategories.length === 0 && (
            <Alert>
              <p>Nenhuma categoria criada até o momento.</p>
            </Alert>
          )}
          {data && data.getAllCategories && data.getAllCategories.length > 0 && (
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <Table>
                <Table.Head>
                  <Table.Th>Categorias</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>

                <Table.Body>
                  {data &&
                    data.getAllCategories &&
                    data.getAllCategories.map((item) => {
                      return (
                        <Table.Tr key={item.id}>
                          <Table.Td>
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 font-medium text-gray-900">
                                  {item.name}
                                </div>
                                <div className="text-sm leading-5 text-gray-500">
                                  {item.slug}
                                </div>
                              </div>
                            </div>
                          </Table.Td>

                          <Table.Td>
                            <Link href={`/categories/${item.id}/edit`}>
                              <a className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </a>
                            </Link>{' '}
                            |{' '}
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={remove(item.id)}
                            >
                              Remove
                            </a>
                          </Table.Td>
                        </Table.Tr>
                      )
                    })}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Index
