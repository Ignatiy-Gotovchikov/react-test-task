import { TableRow } from './TableRow';
import { useMatrix } from '../context/MatrixContext';
import styles from '../styles/Table.module.scss';
import { Button } from './Button';
import { calculateColumnAverages } from '../utils/matrix';

export const Table= () => {
  const { matrix, selectedRows, deleteSelectedRows, addRow } = useMatrix();

  if (!matrix.length) {
    return <p>Матрица пуста или не загружена.</p>;
  }

  const columnAverages = calculateColumnAverages(matrix);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Row Name</th>
            {matrix[0].map((_, idx) => (
              <th key={idx}>Cell values N = {idx + 1}</th>
            ))}
            <th>Sum values</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <TableRow key={rowIndex} row={row} rowIndex={rowIndex} />
          ))}
          <tr>
            <td></td>
            <td>Average Value</td>
            {columnAverages.map((avg, idx) => (
              <td key={idx}>{avg.toFixed(2)}</td>
            ))}
            <td></td>
          </tr>
        </tbody>
      </table>

      {selectedRows.size > 0 && (
        <Button onClick={deleteSelectedRows} color="secondary">
          Delete
        </Button>
      )}

      <Button onClick={addRow}>
        Add
      </Button>
    </>
  );
};
