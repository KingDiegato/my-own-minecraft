import React from 'react'
import { Link } from 'react-router-dom'
import styles from './menu.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.tittle} >Gato Craft!</h2>
        <div>
          <Link className={styles.button} to='/game'>Play Now!</Link>
          <Link className={styles.button} to='/options'>Options!</Link>
        </div>
      </div>
    <main className={styles.background}>
    </main>
    </>
  )
}
