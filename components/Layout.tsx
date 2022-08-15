import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { getClientData, getNav } from '../api/contentful';
import styles from '../styles/Home.module.css';
import { NavBar } from './NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, isError, data } = useQuery(['albums'], getClientData);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  const navData = getNav(data);

  return (
    <>
      <Head>
        <title>Christopher Allen Photography</title>
        <meta
          name="description"
          content="Fine portrait and landscape photography in Whitinsville, Massachusetts."
        />
        {/* what to use for the favicon? */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        <Link href="/">Christopher Allen Photography</Link>
      </h1>

      <NavBar navData={navData} />

      <main className={styles.main}>{children}</main>

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
    </>
  );
}
