import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import * as contentful from 'contentful';

const Home: NextPage = () => {
   const client = contentful.createClient({
    space: 'cwx5ke1iw7ue',
    accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I'
  })

  client.getEntries().then(entries => {
    console.log(entries)
    entries.items.forEach(function (entry) {
      if (entry.fields.productName) {
        console.log(entry.fields.productName);
      }
    });
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
          <a href="/">Christopher Allen Photography</a>
        </h1>

        <nav>
          {/* dynamically generated links to albums */}
        </nav>

        {/* hero image */}
      </main>

      <footer>
        <p>Christopher Allen Photography, Whitinsville, Massachusetts, email to "contact" @ this website.</p>
        <p>© {new Date().getFullYear()} Christopher Allen Photography. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
