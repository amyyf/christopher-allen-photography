import { generateAlbumPaths, getAlbumData } from '../../../api/contentful';
import Image from 'next/image';

import * as contentful from 'contentful';
import { GetStaticProps, GetStaticPaths } from 'next';
import type { Album } from '../../../types';
import { useRouter } from 'next/router';
import Link from 'next/link';

// TODO: pass this in correctly!
const client = contentful.createClient({
  space: 'cwx5ke1iw7ue',
  accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I',
});

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await generateAlbumPaths(client);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const albumData = await getAlbumData(client, params?.id as string);
  return {
    props: {
      id: albumData.id,
      fields: albumData.fields,
    },
  };
};

export default function Album({ id, fields }: { id: string; fields: Album }) {
  const images: contentful.Asset[] = fields.album.map((image) => image);
  return (
    <>
      <h2>{fields.title}</h2>
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
