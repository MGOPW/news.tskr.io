import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import ParticipantsCell from 'src/components/Participant/ParticipantsCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    showMatching,
    filterOut,
    link: (givenId) => {
      return routes.participant({ id: givenId })
    },
    dataType: 'integer',
  },

  {
    Header: 'Created at',
    accessor: 'createdAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  {
    Header: 'Updated at',
    accessor: 'updatedAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  {
    Header: 'Active',
    accessor: 'active',
    showMatching,
    filterOut,
    dataType: 'boolean',
  },

  {
    Header: 'Name',
    accessor: 'name',
    showMatching,
    filterOut,
  },

  {
    Header: 'Actions',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
  },
]

const ParticipantsList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'participantCreate',
    updateRecord: 'participantUpdate',
    deleteRecord: 'participantDelete',
  }

  return (
    <Fragment>
      <ParticipantsCell
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        columns={columns}
        setColumns={setColumns}
        initialColumns={initialColumns}
        take={take}
        setTake={setTake}
        skip={skip}
        setSkip={setSkip}
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        displayColumn="id"
        roles={roles}
      />
    </Fragment>
  )
}

export default ParticipantsList
