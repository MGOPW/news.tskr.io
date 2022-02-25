import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import FeedsCell from 'src/components/Feed/FeedsCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Title',
    accessor: 'title',
    link: (givenId) => {
      return routes.feed({ id: givenId })
    },
    showMatching,
    filterOut,
  },
  {
    Header: 'Active',
    accessor: 'active',
    showMatching,
    filterOut,
  },

  {
    Header: 'Rss',
    accessor: 'rssUrl',
    showMatching,
    filterOut,
  },

  {
    Header: 'Group',
    accessor: 'group',
    showMatching,
    filterOut,
    dataType: 'integer',
    // If this is a reference
    // you may want to show a field
    // instead of the number here.
    // to do that remove type,
    // updated your query on the cell to include the model
    // update the accessor to a name not used by a column
    // and add;
    // canSort: false,
    reference: true,
    field: 'name',
    // link: (givenId) => {
    //   // e.g. return routes._insertPluralModelHere_({ q: {"id": givenId}})
    //   // e.g. return routes.users({ q: `{"id": }` })// link to a list w/the query
    //   // e.g. return routes.user({ q: `{"id": }` })// link to the record
    //},
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

const FeedsList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'feedCreate',
    updateRecord: 'feedUpdate',
    deleteRecord: 'feedDelete',
  }

  return (
    <Fragment>
      <FeedsCell
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

export default FeedsList
