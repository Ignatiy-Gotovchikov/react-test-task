import { useMatrix } from '../context/MatrixContext';
import { Cell } from '../types';

interface TableCellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
}

export const TableCell = ({ cell, rowIndex, colIndex }: TableCellProps) => {
  const { updateCellValue, highlightClosestCells, clearRowPercentage, rowPercentage, highlightedRowIndex, highlightedCells } = useMatrix();

  const isHighlighted = highlightedCells.has(cell.id);
  const shouldShowPercentage = highlightedRowIndex === rowIndex;

  return (
    <td 
      onClick={() => updateCellValue(rowIndex, colIndex, 1)} // Из-за StrictMode будет прибавляться +2, т.к. идет два рендера. В проде StrictMode убирается, а значит будет корректное прибавление +1.
      onMouseEnter={() => highlightClosestCells(rowIndex, colIndex, 5)} 
      onMouseLeave={() => clearRowPercentage()} 
      style={{ 
        background: shouldShowPercentage
          ? `linear-gradient(to top, #ff9800 ${rowPercentage[colIndex]}%, transparent 0)` 
          : isHighlighted 
            ? '#ff9800' 
            : ''
      }}
    >
      {shouldShowPercentage ? `${cell.amount} → ${rowPercentage[colIndex].toFixed(0)}%` : cell.amount}
    </td>
  );
};
