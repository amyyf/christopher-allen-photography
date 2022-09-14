import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { useImageQuery } from '../../../data/queries';
import { BLUR_DATA_URL } from '../../../data/contentful';

export default function ImageWrapper() {
  const router = useRouter();
  const { albumSlug, imageSlug } = router.query;

  const { isLoading, isError, data } = useImageQuery(imageSlug, albumSlug);

  return (
    <section className="text-center">
      <div>
        {data?.previousImageSlug && (
          <Link href={`/albums/${albumSlug}/${data.previousImageSlug}`}>
            <a className="inline-block h-11 w-11">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-zinc-400 hover:text-zinc-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </a>
          </Link>
        )}

        <Link href={`/albums/${albumSlug}`}>
          <a className="inline-block h-11 w-11">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-zinc-400 hover:text-zinc-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7l4-4m0 0l4 4m-4-4v18"
              />
            </svg>
          </a>
        </Link>

        {data?.nextImageSlug && (
          <Link href={`/albums/${albumSlug}/${data.nextImageSlug}`}>
            <a className="inline-block h-11 w-11">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-zinc-400 hover:text-zinc-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Link>
        )}
      </div>

      {isError ? (
        <Error message="The image could not be found. Please try again." />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-screen-lg mx-auto">
          <Image
            alt={data.asset.fields.description || data.description}
            src={`https:${data.asset.fields.file.url}`}
            width={data.asset.fields.file.details.image?.width}
            height={data.asset.fields.file.details.image?.height}
            priority
          />
          {data.description && (
            <p className="text-zinc-400 text-sm mt-4">{data.description}</p>
          )}
        </div>
      )}
    </section>
  );
}
