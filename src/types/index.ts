export type CellId = number; 
export type CellValue = number; 

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export interface MatrixContextType {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
  updateCellValue: (rowIndex: number, colIndex: number, increment: number) => void;
  highlightedCells: Set<number>;
  highlightClosestCells: (rowIndex: number, colIndex: number, x: number) => void;
  rowPercentage: number[];
  calculateRowPercentage: (rowIndex: number) => void;
  clearRowPercentage: () => void;
  clearHighlightedCells: () => void;
  highlightedRowIndex: number | null;
  selectedRows: Set<number>;
  toggleRowSelection: (rowIndex: number) => void;
  deleteSelectedRows: () => void;
  addRow: () => void;
  rowSums: number[];
}

export interface GenerateMatrixArgs {
  rows: number;
  cols: number;
}
