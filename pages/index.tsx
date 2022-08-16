import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { getHomepagePhoto } from '../api/contentful';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Home: NextPage = () => {
  const { isLoading, isError, data } = useQuery(
    ['homepagePhoto'],
    getHomepagePhoto,
  );

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className={styles.container}>
      <Image
        alt={data.items[0].fields.image.fields.description}
        src={`https:${data.items[0].fields.image.fields.file.url}`}
        width={data.items[0].fields.image.fields.file.details.image?.width}
        height={data.items[0].fields.image.fields.file.details.image?.height}
      />
    </div>
  );
};

export default Home;
