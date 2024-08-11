import { useEffect } from 'react';
import { Table } from './components/Table';
import { useMatrix } from './context/MatrixContext';
import { generateMatrix } from './utils/matrix';

const App= () => {
  const { setMatrix } = useMatrix();

  useEffect(() => {
    const rows = 10; // Кол-во строк (M)
    const cols = 5;  // Кол-во столбцов (N)
    const initialMatrix = generateMatrix(rows, cols);
    setMatrix(initialMatrix);
  }, [setMatrix]);

  return <Table />;
};

export default App;
