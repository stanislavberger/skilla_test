import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TableContext } from "../../store/TableProvider";
import TableRow from './TableRow';
import arrowTop from "../../assets/icons/arrow_top.svg"
import arrowDown from "../../assets/icons/arrow_bottom.svg"

const Table = observer(() => {
  const tableStore = useContext(TableContext);
  const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'ascending' });

  useEffect(() => {
    tableStore.fetchData();
  }, [tableStore]);
  
  // Sort function
  const sortedData = React.useMemo(() => {
    let sortableItems = [...tableStore.data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'time') {
          const timeA = new Date(`1970-01-01T${a.date.split(" ")[1]}Z`).getTime();
          const timeB = new Date(`1970-01-01T${b.date.split(" ")[1]}Z`).getTime();
          return sortConfig.direction === 'ascending' ? timeA - timeB : timeB - timeA;
        }
        
        return 0;
      });
    }
    return sortableItems;
  }, [tableStore.data, sortConfig]);

  // request key for sortedData

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (tableStore.loading) {
    return <div>Загрузка...</div>;
  }

  if (tableStore.error) {
    return <div>Ошибка: {tableStore.error.message}</div>;
  }

  return (
    <table className='mainTable'>
      <thead className='tableHeader'>
        <tr className="tableHeader-block">
          <th>Тип</th>
          <th onClick={() => requestSort('time')}>
            <div className="timeHeader">
            Время 
            {sortConfig.key === 'time' && (
              sortConfig.direction === 'ascending' ? 
              <img src={arrowTop} alt="Ascending" width="18" height="21" /> : 
              <img src={arrowDown} alt="Descending" width="18" height="21" />
            )}
            </div>
          </th>
          <th>Сотрудник</th>
          <th>Звонок</th>
          <th>Источник</th>
          <th>Оценка</th>
          <th onClick={() => requestSort('duration')}>Длительность</th>
        </tr>
      </thead>
      <tbody className='tableBody'>
        {Array.isArray(sortedData) && sortedData.length > 0 ? (
          sortedData.map((row, index) => (
            <TableRow key={index} row={row} />
          ))
        ) : (
          <tr>
            <td colSpan="7">Нет данных для отображения.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
});

export default Table;