import { useRouter } from 'next/router';
import { getImage } from '../../../api/contentful';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

export default function ImageWrapper() {
  const router = useRouter();
  const { imageId } = router.query;

  const { isLoading, isError, data } = useQuery(
    ['image', imageId],
    () => getImage(imageId),
    { enabled: !!imageId && typeof imageId === 'string' },
  );

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <Image
      alt={data.fields.description}
      src={`https:${data.fields.file.url}`}
      width={data.fields.file.details.image?.width}
      height={data.fields.file.details.image?.height}
    />
  );
}
