import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { Nav } from '../components/nav';

import * as contentful from 'contentful';
import { getClientData, getNav } from '../api/contentful';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Home: NextPage = () => {
  const { isLoading, isError, data } = useQuery(['albums'], getClientData);
  console.log(data);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  const navData = getNav(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Christopher Allen Photography</title>
        <meta
          name="description"
          content="Fine portrait and landscape photography in Whitinsville, Massachusetts."
        />
        {/* what to use for the favicon? */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">Christopher Allen Photography</Link>
        </h1>

        <Nav navData={navData} />

        {/* hero image */}
      </main>

      <footer>
        <p>
          Christopher Allen Photography, Whitinsville, Massachusetts, email to
          &quot;contact&quot; @ this website.
        </p>
        <p>
          © {new Date().getFullYear()} Christopher Allen Photography. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
