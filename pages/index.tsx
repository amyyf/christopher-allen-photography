import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { getHomepagePhoto } from '../data/contentful';
import Image from 'next/image';
import Loading from '../components/Loading';
import Link from 'next/link';
import fallbackHome from '../public/fallback-home.jpeg';

const Home: NextPage = () => {
  const { isLoading, isError, data } = useQuery(
    ['homepagePhoto'],
    getHomepagePhoto,
  );

  if (isLoading) return <Loading />;

  return (
    <div className="text-center">
      <Link href="/galleries">
        <a>
          {isError || !data ? (
            <Image alt="A peaceful green field with trees" src={fallbackHome} />
          ) : (
            <Image
              priority={true}
              alt={data.fields.image.fields.description}
              src={`https:${data.fields.image.fields.file.url}`}
              width={data.fields.image.fields.file.details.image?.width}
              height={data.fields.image.fields.file.details.image?.height}
            />
          )}
        </a>
      </Link>
    </div>
  );
};

export default Home;
