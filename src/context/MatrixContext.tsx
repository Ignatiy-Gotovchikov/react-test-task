import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Cell, MatrixContextType } from '../types';
import { calculateRowSums } from '../utils/matrix';

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrix must be used within a MatrixProvider');
  }
  return context;
};

export const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [highlightedCells, setHighlightedCells] = useState<Set<number>>(new Set());
  const [rowPercentage, setRowPercentage] = useState<number[]>([]);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [rowSums, setRowSums] = useState<number[]>([]);

  useEffect(() => {
    if (matrix.length > 0) {
      setRowSums(calculateRowSums(matrix));
    }
  }, [matrix]);

  const updateCellValue = (rowIndex: number, colIndex: number, increment: number) => {
    setMatrix(prevMatrix => {
      const newMatrix = [...prevMatrix];
      newMatrix[rowIndex][colIndex].amount += increment;
      return newMatrix;
    });
  };

  const highlightClosestCells = (rowIndex: number, colIndex: number, x: number) => {
    if (!matrix.length) return;

    const targetValue = matrix[rowIndex][colIndex].amount;
    const flattenedMatrix = matrix.flat();
    
    const closestCells = flattenedMatrix
      .map(cell => ({ ...cell, difference: Math.abs(cell.amount - targetValue) }))
      .sort((a, b) => a.difference - b.difference)
      .slice(0, x);

    const highlightedIds = new Set(closestCells.map(cell => cell.id));
    setHighlightedCells(highlightedIds);
  };

  const clearHighlightedCells = () => {
    setHighlightedCells(new Set());
  };

  const calculateRowPercentage = (rowIndex: number) => {
    const row = matrix[rowIndex];
    const rowSum = row.reduce((sum, cell) => sum + cell.amount, 0);
    const percentages = row.map(cell => (cell.amount / rowSum) * 100);
    setRowPercentage(percentages);
    setHighlightedRowIndex(rowIndex);
    clearHighlightedCells();
  };

  const clearRowPercentage = () => {
    setRowPercentage([]);
    setHighlightedRowIndex(null);
  };

  const toggleRowSelection = (rowIndex: number) => {
    setSelectedRows(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(rowIndex)) {
        newSelected.delete(rowIndex);
      } else {
        newSelected.add(rowIndex);
      }
      return newSelected;
    });
  };

  const deleteSelectedRows = () => {
    setMatrix(prevMatrix => {
      return prevMatrix.filter((_, index) => !selectedRows.has(index));
    });
    setSelectedRows(new Set());
};


  const addRow = () => {
    setMatrix(prevMatrix => {
      const cols = prevMatrix[0]?.length || 5;
      const newRow: Cell[] = Array.from({ length: cols }, (_, index) => ({
        id: Date.now() + index,
        amount: Math.floor(Math.random() * 900) + 100
      }));
      return [...prevMatrix, newRow];
    });
  };

  return (
    <MatrixContext.Provider value={{ 
      matrix, 
      setMatrix, 
      updateCellValue, 
      highlightedCells, 
      highlightClosestCells, 
      rowPercentage, 
      calculateRowPercentage, 
      clearRowPercentage,
      clearHighlightedCells,
      highlightedRowIndex,
      selectedRows,
      toggleRowSelection,
      deleteSelectedRows,
      addRow,
      rowSums
    }}>
      {children}
    </MatrixContext.Provider>
  );
};
