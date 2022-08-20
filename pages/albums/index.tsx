import { useQuery } from '@tanstack/react-query';
import { getSiteNav } from '../../api/contentful';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Link from 'next/link';
import Image from 'next/image';

export default function AlbumNav() {
  const { isLoading, isError, data } = useQuery(['siteNav'], getSiteNav);
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Something went wrong getting the data, please try again." />
    );

  return (
    <section className="flex flex-wrap gap-5">
      {data.map((albumData) => (
        <Link
          href={`/albums/${albumData.contentfulId}`}
          key={albumData.contentfulId}
        >
          <a className="w-52 block relative text-transparent hover:text-zinc-100 hover:bg-zinc-900 hover:opacity-50 hover:transition">
            <Image
              alt={albumData.firstImage.description}
              src={`https:${albumData.firstImage.url}`}
              height={albumData.firstImage.height}
              width={albumData.firstImage.width}
            />
            <h2 className="text-lg absolute top-1/3 left-5">
              {albumData.title}
            </h2>
          </a>
        </Link>
      ))}
    </section>
  );
}
