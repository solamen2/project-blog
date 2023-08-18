import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2>Not Found</h2>
      <div className={styles.page}>
        <p>Could not find requested resource.</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
