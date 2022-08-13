import * as contentful from 'contentful';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getImage } from '../../../api/contentful';
import Image from 'next/image';

export default function ImageWrapper() {
  const router = useRouter();
  const { imageId } = router.query;

  const client = useMemo(
    () =>
      contentful.createClient({
        space: 'cwx5ke1iw7ue',
        accessToken: 'kpL8Ke1IaByl2DBbXoCorhKFs0gyt7R4YmzUyLXl2-I',
      }),
    [],
  );

  const [imageData, setImageData] = useState<contentful.Asset | null>();

  useEffect(() => {
    async function getImageData(imageId: string) {
      const data = await getImage(client, imageId);
      // TODO: will want to check that we are on the correct image when navigating between images
      setImageData(data);
    }
    if (
      imageId &&
      typeof imageId === 'string' &&
      imageData?.sys.id !== imageId
    ) {
      getImageData(imageId);
    }
  }, [client, imageId, imageData?.sys.id]);

  return imageData ? (
    <Image
      alt={imageData.fields.description}
      src={`https:${imageData.fields.file.url}`}
      width={imageData.fields.file.details.image?.width}
      height={imageData.fields.file.details.image?.height}
    />
  ) : (
    <div>no image here</div>
  );
}
