import { getAlbumData } from '../../../api/contentful';
import Image from 'next/image';

import type { Album } from '../../../types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

export default function Album() {
  const router = useRouter();
  const { albumId } = router.query;

  const { isLoading, isError, data } = useQuery(
    ['album', albumId],
    () => getAlbumData(albumId),
    {
      enabled: !!albumId && typeof albumId === 'string',
    },
  );
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Sorry, the images could not be found. Please try again." />
    );

  const images = data.album;
  const title = data.title;

  return (
    <>
      <section className="grid gap-5 grid-cols-album">
        <h2 className="self-center justify-self-center md:col-start-2 md:row-start-2 text-xl">
          {title}
        </h2>
        {images.map((image) => (
          <Link
            key={image.fields.title}
            href={`/albums/${albumId}/${image.sys.id}`}
            prefetch
          >
            <a>
              <Image
                alt={image.fields.description}
                src={`https:${image.fields.file.url}`}
                width={image.fields.file.details.image?.width}
                height={image.fields.file.details.image?.height}
              />
            </a>
          </Link>
        ))}
      </section>
    </>
  );
}
