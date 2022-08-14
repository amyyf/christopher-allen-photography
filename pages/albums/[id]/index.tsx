import { getAlbumData } from '../../../api/contentful';
import Image from 'next/image';

import * as contentful from 'contentful';
import type { Album } from '../../../types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// TODO: pass this in correctly!
const client = contentful.createClient({
  space: 'cwx5ke1iw7ue',
  accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I',
});

export default function Album() {
  const [images, setImages] = useState<contentful.Asset[] | null>(null);
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function getData(id: string) {
      const data = await getAlbumData(client, id);
      setImages(data.album);
      setTitle(data.title);
    }
    if (id && typeof id === 'string' && !images) getData(id);
  });

  return images ? (
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
  ) : (
    <div>no images</div>
  );
}
