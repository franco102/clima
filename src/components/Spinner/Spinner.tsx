import styles from './Spinner.module.css'

export const Spinner = () => {
  return (
    <>
    <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
    </div>
    </>
  )
}
