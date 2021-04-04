import React from 'react';
import { Users } from './components/Users';
import styles from './styles/styles.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Users/>
    </div>
  );
}

export default App;
