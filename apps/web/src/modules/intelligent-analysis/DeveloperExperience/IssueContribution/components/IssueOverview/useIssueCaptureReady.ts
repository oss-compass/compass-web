import { useEffect, useState } from 'react';

/** Weekly screenshots wait for both data and deferred component code. */
export const useIssueCaptureReady = (enabled: boolean) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    setError(null);
    Promise.all([
      import('./IssueRepoProgressSection'),
      import('./IssuePainInsights'),
    ])
      .then(() => {
        if (active) setReady(true);
      })
      .catch((reason: unknown) => {
        if (active)
          setError(
            reason instanceof Error ? reason : new Error(String(reason))
          );
      });
    return () => {
      active = false;
    };
  }, [enabled]);
  return { ready: !enabled || ready, error };
};
