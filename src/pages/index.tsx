import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | space traveling</title>
      </Head>
      <main className={commonStyles.container}>
        <div className={styles.posts}>
          <Link href="/">
            <a>
              <strong>titulo do post</strong>
              <p>um pequeno resumo sobre o post</p>
              <div className={styles.time}>
                <time>
                  <FiCalendar />
                  15 Maio 2021
                </time>
                <p>
                  <FiUser />
                  Danilo vieira
                </p>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a>
              <strong>titulo do post</strong>
              <p>um pequeno resumo sobre o post</p>
              <div className={styles.time}>
                <time>
                  <FiCalendar />
                  15 Maio 2021
                </time>
                <p>
                  <FiUser />
                  Danilo vieira
                </p>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a>
              <strong>titulo do post</strong>
              <p>um pequeno resumo sobre o post</p>
              <div className={styles.time}>
                <time>
                  <FiCalendar />
                  15 Maio 2021
                </time>
                <p>
                  <FiUser />
                  Danilo Vieira
                </p>
              </div>
            </a>
          </Link>
          <button type="button">Carregar mais posts</button>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
