import { GetStaticPaths, GetStaticProps } from 'next';

import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import * as PrismicHelper from '@prismicio/helpers';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { formatDate } from '../../utils';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  const wordsPerMinute = 200;
  const readTime = useMemo(() => {
    const totalWords = post.data.content.reduce((total, contentItem) => {
      const headingWords = contentItem.heading.split(/\s/g).length;

      const bodyWords = contentItem.body.reduce(
        (totalWordsLength, currentBody) => {
          const wordsLength = currentBody.text.split(/\s/g).length;
          return totalWordsLength + wordsLength;
        },
        0
      );

      return total + headingWords + bodyWords;
    }, 0);

    return Math.ceil(totalWords / wordsPerMinute);
  }, [post.data.content]);

  if (router.isFallback) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>

      <Header
        styleContainer={styles.header}
        styleContent={styles.headerContent}
      />

      <div className={styles.banner}>
        <img src={post.data.banner.url} alt="banner" />
      </div>

      <main className={`${commonStyles.container} ${styles.container}`}>
        <div className={styles.post}>
          <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <time className={styles.detail}>
              <FiCalendar />
              {formatDate(post.first_publication_date)}
            </time>
            <span className={styles.detail}>
              <FiUser />
              {post.data.author}
            </span>
            <span className={styles.detail}>
              <FiClock />
              {`${readTime} min`}
            </span>
          </div>
          <div className={styles.postContent}>
            {post.data.content.map(content => (
              <article key={content.heading}>
                <h2>{content.heading}</h2>
                <div
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{
                    __html: PrismicHelper.asHTML(content.body),
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('post');

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', String(slug), {});

  return {
    props: { post: response },
  };
};
