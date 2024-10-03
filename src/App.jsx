import Table from './components/Table/Table'
import { TableProvider } from './store/TableProvider'

function App() {
  return (
      <div className='wrapper'>
        <TableProvider>
          <Table />
        </TableProvider>
      </div>
  )
}

export default App
