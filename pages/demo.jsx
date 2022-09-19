import React from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default function Demo({ providers }) {
  const session = useSession();
  console.log('useSession', session);
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>

          <br />
          <button onClick={() => signOut(provider.id)}>
            signOut with {provider.name}
          </button>

          <br />
          <pre>{session && JSON.stringify(session, null, 2)}</pre>
        </div>
      ))}
    </>
  );
}
