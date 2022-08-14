import { getAlbumData } from '../../../api/contentful';
import Image from 'next/image';

import type { Album } from '../../../types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

export default function Album() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data } = useQuery(
    ['album', id],
    () => getAlbumData(id),
    {
      enabled: !!id && typeof id === 'string',
    },
  );
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  const images = data.album;
  const title = data.title;

  return (
    <>
      <h2>{title}</h2>
      {images.map((image) => (
        <Link key={image.fields.title} href={`/albums/${id}/${image.sys.id}`}>
          <Image
            alt={image.fields.description}
            src={`https:${image.fields.file.url}`}
            width={image.fields.file.details.image?.width}
            height={image.fields.file.details.image?.height}
          />
        </Link>
      ))}
    </>
  );
}
