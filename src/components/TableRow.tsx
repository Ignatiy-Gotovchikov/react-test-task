import { useMatrix } from '../context/MatrixContext';
import { TableCell } from './TableCell';
import { Checkbox } from './Checkbox';
import { Cell } from '../types';

interface TableRowProps {
  row: Cell[];
  rowIndex: number;
}

export const TableRow = ({ row, rowIndex }: TableRowProps) => {
  const { toggleRowSelection, calculateRowPercentage, clearRowPercentage, rowSums, selectedRows } = useMatrix();

  return (
    <tr>
      <td>
        <Checkbox 
          onChange={() => toggleRowSelection(rowIndex)} 
          checked={selectedRows.has(rowIndex)} 
        />
      </td>
      <td>Cell value M = {rowIndex + 1}</td>
      {row.map((cell, colIndex) => (
        <TableCell key={cell.id} cell={cell} rowIndex={rowIndex} colIndex={colIndex} />
      ))}
      <td 
        onMouseEnter={() => calculateRowPercentage(rowIndex)} 
        onMouseLeave={() => clearRowPercentage()}
      >
        {rowSums[rowIndex]}
      </td>
    </tr>
  );
};
