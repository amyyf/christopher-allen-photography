import { useRouter } from 'next/router';

export default function Error({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div className="bg-zinc-300 max-w-xs my-5 mx-auto p-5">
      <p>{message}</p>
      <button onClick={() => router.back()} className="hover:opacity-60">
        Go back
      </button>
    </div>
  );
}
