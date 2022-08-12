import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'

import Nav from '../components/nav';

import * as contentful from 'contentful';
import Album from './albums/[id]';
import { getAlbumData } from '../api/contentful';


const Home: NextPage = () => {
   const client = contentful.createClient({
    space: 'cwx5ke1iw7ue',
    accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I'
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Christopher Allen Photography</title>
        <meta name="description" content="Fine portrait and landscape photography in Whitinsville, Massachusetts." />
        {/* what to use for the favicon? */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">Christopher Allen Photography</Link>
        </h1>

        <Nav client={client} />

        {/* hero image */}
      </main>

      <footer>
        <p>Christopher Allen Photography, Whitinsville, Massachusetts, email to &quot;contact&quot; @ this website.</p>
        <p>© {new Date().getFullYear()} Christopher Allen Photography. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
