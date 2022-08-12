import { generatePaths, getAlbumData } from "../../api/contentful";

import * as contentful from 'contentful';
import { GetStaticProps, GetStaticPaths } from 'next';
import type { Album } from "../../types";

const client = contentful.createClient({
  space: 'cwx5ke1iw7ue',
  accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I'
})

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await generatePaths(client);
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const albumData = await getAlbumData(client, params?.id as string);
  return {
    props: {
      id: albumData.id,
      fields: albumData.fields
    }
  }
}

export default function Album({ id, fields }: { id: string, fields: Album}) {
  console.log(id, fields)
  return <div>{fields.title}</div>;
}