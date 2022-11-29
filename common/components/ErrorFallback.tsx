import { useTranslation, Trans } from 'react-i18next';
import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const { t } = useTranslation();
  return (
    <div role="alert">
      <div className="py-50 rounded-md px-10 ">
        <div className="flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold text-yellow-600">
            {t('common:error.something_went_wrong')}
          </h1>

          <h6 className="text-1xl mb-2 text-center font-bold text-gray-800 md:text-3xl">
            <Trans
              i18nKey="error.oops"
              ns="common"
              values={{ message: error.message }}
              components={{
                s: <span className="text-red-500" />,
              }}
            />
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            {t(
              'common:error.try_to_refresh_this_page_or_feel_free_to_contact_u'
            )}
          </p>

          <button
            className="bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800"
            onClick={resetErrorBoundary}
          >
            {t('common:error.try_again')}
          </button>
        </div>
      </div>
    </div>
  );
}
