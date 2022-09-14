import Image from 'next/image';

import type { Album } from '../../../types/data';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { convertTitleToSlug } from '../../../utils';
import { useAlbumQuery } from '../../../data/queries';
import { BLUR_DATA_URL } from '../../../data/contentful';

export default function Album() {
  const router = useRouter();
  const { albumSlug } = router.query;

  const { isLoading, isError, data } = useAlbumQuery(albumSlug);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Sorry, the images could not be found. Please try again." />
    );

  return (
    <>
      <section className="grid gap-x-5 gap-y-3 grid-cols-album auto-rows-album place-content-center">
        <h2 className="self-center justify-self-center md:col-start-2 md:row-start-2 text-xl text-zinc-300">
          {data.title}
        </h2>
        {data.entries.map((entry) => (
          <div key={entry.fields.visual.fields.title}>
            <div className="h-full relative text-transparent hover:text-zinc-200 hover:transition">
              <Link
                href={`/albums/${albumSlug}/${convertTitleToSlug(
                  entry.fields.title,
                  entry.fields.visual.fields.title,
                )}`}
              >
                <a>
                  <Image
                    alt={entry.fields.description}
                    src={`https:${entry.fields.visual.fields.file.url}?fm=jpg&fl=progressive`}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    layout="fill"
                    objectFit="contain"
                    objectPosition={'center'}
                    className="hover:opacity-50 hover:transition"
                  />
                </a>
              </Link>
              <h3 className="text-md absolute top-1/3 left-5">
                {entry.fields.title}
              </h3>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
