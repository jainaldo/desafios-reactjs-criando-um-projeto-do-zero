import Link from 'next/link';
import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

interface HeaderProps {
  styleContainer?: string;
  styleContent?: string;
}

export default function Header({
  styleContainer,
  styleContent,
}: HeaderProps): JSX.Element {
  return (
    <header
      className={`${commonStyles.container} ${styles.container} ${styleContainer}`}
    >
      <Link href="/">
        <div className={`${styles.content} ${styleContent}`}>
          <img src="/images/Logo.svg" alt="logo" />
        </div>
      </Link>
    </header>
  );
}
