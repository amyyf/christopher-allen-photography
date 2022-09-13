import Image from 'next/image';

import type { Album } from '../../../data/types';
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
      <section className="grid gap-5 grid-cols-album">
        <h2 className="self-center justify-self-center md:col-start-2 md:row-start-2 text-xl text-zinc-300">
          {data.title}
        </h2>
        {data.entries.map((entry) => (
          <Link
            key={entry.fields.visual.fields.title}
            href={`/albums/${albumSlug}/${convertTitleToSlug(
              entry.fields.title,
              entry.fields.visual.fields.title,
            )}`}
          >
            <a>
              <Image
                alt={entry.fields.description}
                src={`https:${entry.fields.visual.fields.file.url}`}
                width={entry.fields.visual.fields.file.details.image?.width}
                height={entry.fields.visual.fields.file.details.image?.height}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </a>
          </Link>
        ))}
      </section>
    </>
  );
}
