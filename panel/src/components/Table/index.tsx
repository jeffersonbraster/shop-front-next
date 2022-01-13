import React from 'react'

type TableProps = {
  children: React.ReactElement | React.ReactElement[]
}

type TableHeadProps = {
  children: React.ReactElement | React.ReactElement[]
}

type TableThProps = {
  children?: string
}

type TableBodyProps = {
  children: React.ReactElement | React.ReactElement[]
}

type TableTrProps = {
  children: React.ReactElement | React.ReactElement[]
}

type TableTdProps = {
  children: any
}

const Table = ({ children }: TableProps) => {
  return <table className="min-w-full">{children}</table>
}

const TableHead = ({ children }: TableHeadProps) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  )
}
const TableTh = ({ children }: TableThProps) => {
  return (
    <th className="px-6 py-3 border-b border-gray-200 bg-blue-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
      {children}
    </th>
  )
}
const TableBody = ({ children }: TableBodyProps) => {
  return <tbody className="bg-white">{children}</tbody>
}
const TableTr = ({ children }: TableTrProps) => <tr>{children}</tr>
const TableTd = ({ children }: TableTdProps) => (
  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
    {children}
  </td>
)
Table.Head = TableHead
Table.Th = TableTh
Table.Body = TableBody
Table.Tr = TableTr
Table.Td = TableTd

export default Table
