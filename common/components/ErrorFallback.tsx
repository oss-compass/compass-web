import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <div className="py-50 rounded-md px-10 ">
        <div className="flex flex-col items-center">
          <h1 className="mb-10 text-3xl font-bold text-blue-600">
            Something went wrong:
          </h1>

          <h6 className="text-1xl mb-2 text-center font-bold text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> {error.message}
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Try to refresh this page or feel free to contact us if the problem
            presists.
          </p>

          <button
            className="bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800"
            onClick={resetErrorBoundary}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
