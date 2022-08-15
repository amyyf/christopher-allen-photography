import { useRouter } from 'next/router';
import {
  getPrevAndNextImages,
  getAlbumData,
  getImage,
} from '../../../api/contentful';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function ImageWrapper() {
  const router = useRouter();
  const { albumId, imageId } = router.query;

  const { isLoading, isError, data } = useQuery(
    ['image', imageId],
    () => getImage(imageId),
    { enabled: !!imageId && typeof imageId === 'string' },
  );
  const {
    isLoading: isLoadingAlbumData,
    isError: isErrorAlbumData,
    data: albumData,
  } = useQuery(['album', albumId], () => getAlbumData(albumId), {
    enabled: !!albumId && typeof albumId === 'string',
  });

  if (isLoading || isLoadingAlbumData) return <div>Loading</div>;
  if (isError || isErrorAlbumData || typeof imageId !== 'string' || !imageId)
    return <div>Error</div>;

  const { previousImageId, nextImageId } = getPrevAndNextImages(
    albumData,
    imageId,
  );

  return (
    <>
      <div>
        {previousImageId && (
          <Link href={`/albums/${albumId}/${previousImageId}`}>previous</Link>
        )}
        {/* is this the UX I want to handle forward/back browser routing?? */}
        <Link href={`/albums/${albumId}`}>up</Link>
        {nextImageId && (
          <Link href={`/albums/${albumId}/${nextImageId}`}>next</Link>
        )}
      </div>
      <Image
        alt={data.fields.description}
        src={`https:${data.fields.file.url}`}
        width={data.fields.file.details.image?.width}
        height={data.fields.file.details.image?.height}
      />
    </>
  );
}
