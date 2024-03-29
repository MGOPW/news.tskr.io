import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import PublicItemsCell from 'src/components/Items/PublicItemsCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Title',
    accessor: 'title',
    outSideLink: true,
    url: 'url',
    title: 'title',
    showMatching,
    filterOut,
    canRemove: false,
  },
  {
    Header: 'Feed',
    accessor: 'feed',
    canSort: false,
    reference: true,
    field: 'title',
    link: (givenId) => {
      //  // e.g. return routes._insertPluralModelHere_({ q: {"id": givenId}})
      //  // e.g. return routes.users({ q: `{"id": }` })// link to a list w/the query
      return routes.home({ q: `{"feedId":${givenId}}` }) // link to the record
    },
  },
  {
    Header: 'Date',
    accessor: 'createdAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  {
    Header: '⚙️',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
    canUpVote: true,
    canReport: true,
    canShare: true,
  },
]

const Welcome = () => {
  let [orderBy, setOrderBy] = useState({ createdAt: 'desc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'feeditemCreate',
    updateRecord: 'feeditemUpdate',
    deleteRecord: 'feeditemDelete',
  }

  return (
    <Fragment>
      <PublicItemsCell
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

export default Welcome
