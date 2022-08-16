import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { getHomepagePhoto } from '../api/contentful';
import Image from 'next/image';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Home: NextPage = () => {
  const { isLoading, isError, data } = useQuery(
    ['homepagePhoto'],
    getHomepagePhoto,
  );

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="An error occurred fetching site data, please try again." />
    );

  return (
    <div className="text-center">
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
