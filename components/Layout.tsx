import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { NavBar } from './NavBar';
import { useRouter } from 'next/router';
import { useSiteNavQuery } from '../data/queries';
import { usePageTitle } from '../data/hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname, query } = useRouter();

  const { data } = useSiteNavQuery();

  const pageTitle = usePageTitle(
    pathname,
    query.imageSlug,
    query.gallerySlug,
    data,
  );

  return (
    /* These flex styles help position the footer at the bottom of the window. */
    <div className="font-sans bg-zinc-900 flex flex-col min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Fine portrait and landscape photography in Whitinsville, Massachusetts."
          key="description"
        />
        <meta property="og:title" content={pageTitle} key="title" />
        <meta
          property="og:description"
          content="Fine portrait and landscape photography in Whitinsville, Massachusetts."
          key="og-description"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:site_name"
          content="Christopher Allen Photography"
          key="og-site-name"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* TODO: TAKE THIS OFF BEFORE GOING LIVE!!!! */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <h1 className="text-4xl border-b-2 mt-4 border-zinc-600">
        <Link href="/">
          <a className="ml-4 md:ml-8 text-zinc-400 hover:text-zinc-300 flex flex-wrap gap-x-3 items-end font-serif">
            Christopher Allen <span className="text-2xl">Photography</span>
          </a>
        </Link>
      </h1>

      <NavBar navData={data} currentGallery={query.gallerySlug} />

      {/* This flex style ensures the main content pushes the footer to the bottom. */}
      <main className="m-8 mb-28 flex-auto">{children}</main>

      <footer className="text-center text-sm text-zinc-500 border-t-2 border-zinc-600 p-4 flex-shrink-0">
        {!query.imageSlug && (
          <p>
            Christopher Allen Photography, Whitinsville, Massachusetts, email to
            &quot;contact&quot; @ this website.
          </p>
        )}
        <p>
          © {new Date().getFullYear()} Christopher Allen Photography. All rights
          reserved.
        </p>
        {!query.imageSlug && (
          <p>
            Designed and built by{' '}
            <a
              href="https://amyfrieson.com"
              className="hover:text-zinc-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Amy Frieson
            </a>
          </p>
        )}
      </footer>
    </div>
  );
}
