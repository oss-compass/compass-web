import React from 'react';
import { useCreateRepoTaskMutation } from '@graphql/generated';
import { useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { AiFillGithub } from 'react-icons/ai';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import client from '@graphql/client';

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

type Inputs = {
  repoUrl: string;
};

const Create: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const session = useSession();
  const isLogin = Boolean(session?.data);

  const { isLoading, isSuccess, isError, data, error, mutate } =
    useCreateRepoTaskMutation(client);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({
      username: session!.data!.login as string,
      repoUrl: data.repoUrl,
      token: session!.data!.accessToken as string,
      origin: 'github',
    });
  };

  return (
    <div className="mx-auto w-[1000px] pt-20">
      {isError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Task failed</span>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your repo has been submit!</span>
          </div>
        </div>
      )}

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            <AiFillGithub className="cursor-pointer text-6xl" />
          </button>
          {/*<SiGitee color="#c71c27" className="cursor-pointer text-6xl" />*/}
        </div>
      ))}

      {session?.data && (
        <>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <button className="btn btn-sm" onClick={() => signOut()}>
            logout
          </button>
        </>
      )}
      <br />

      <div className="py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4 w-full max-w-xs">
            <label className="label">
              <span className="label-text">repo url</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              {...register('repoUrl')}
              className="input input-bordered input-sm w-full "
            />
            {/*<label className="label">*/}
            {/*<span className="label-text-alt">Alt label</span>*/}
            {/*</label>*/}
          </div>

          <button
            className={classnames('btn btn-sm', { loading: isLoading })}
            type="submit"
            disabled={!isLogin}
          >
            {isLogin ? 'submit' : 'please login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
