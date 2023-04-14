import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={`${commonStyles.container} ${styles.content}`}>
        <img src="/images/Logo.svg" alt="logo" />
      </div>
    </header>
  );
}
