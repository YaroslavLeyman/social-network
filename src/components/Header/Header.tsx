import React, { FC } from 'react';
import styles from './Header.module.css';

const Header:FC = () => {
  return (
    <header className={styles.header}>
      <img src="/logo.png" alt="logo" className={styles.headerLogo} />
      <p className={styles.headerTitle}>Социальная сеть</p>
    </header>
  )
}

export default Header