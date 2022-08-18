import { useQuery } from '@tanstack/react-query';
import { getClientData } from '../../api/contentful';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Link from 'next/link';
import Image from 'next/image';

export default function Albums() {
  const { isLoading, isError, data } = useQuery(['albums'], getClientData);
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error message="Something went wrong getting the data, please try again." />
    );

  return (
    <section className="flex flex-wrap gap-5">
      {data.items.map((album) => (
        <Link href={`/albums/${album.sys.id}`} key={album.sys.id}>
          <a className="w-52 block relative text-transparent hover:text-zinc-100 hover:bg-zinc-900 hover:opacity-50 hover:transition">
            <Image
              alt={album.fields.album[0].fields.description}
              src={`https:${album.fields.album[0].fields.file.url}`}
              height={album.fields.album[0].fields.file.details.image?.height}
              width={album.fields.album[0].fields.file.details.image?.width}
            />
            <h2 className="text-lg absolute top-1/3 left-5">
              {album.fields.title}
            </h2>
          </a>
        </Link>
      ))}
    </section>
  );
}
