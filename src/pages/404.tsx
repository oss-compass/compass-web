import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-5 text-5xl font-bold">404</h1>
      <p className="mb-8 text-lg text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="bg-black py-2 px-4 font-bold text-white hover:bg-gray-700">
          Go back to Home
        </a>
      </Link>
    </div>
  );
}

export default NotFound;
