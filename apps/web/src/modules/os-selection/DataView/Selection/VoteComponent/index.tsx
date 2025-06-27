import React, { useState } from 'react';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { useVoteUpMutation, useVoteDownMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { TrackingWrapper } from '@common/monumentedStation';

interface VoteComponentProps {
  srcPackageName: string;
  srcEcosystem: string;
  targetPackageName: string;
  targetEcosystem: string;
  whoVote: string;
}

const VoteComponent: React.FC<VoteComponentProps> = ({
  srcPackageName,
  srcEcosystem,
  targetPackageName,
  targetEcosystem,
  whoVote,
}) => {
  const { t } = useTranslation('os-selection');
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const voteUpMutation = useVoteUpMutation(client, {
    onSuccess: (data) => {
      setIsVoting(false);
      if (data.voteUp?.status === 'true') {
        setVoteStatus('up');
        toast.success(data.voteUp?.message || t('vote.vote_up_success'));
      } else {
        toast.error(data.voteUp?.message || t('vote.vote_up_failed'));
      }
    },
    onError: (error) => {
      setIsVoting(false);
      toast.error(t('vote.vote_up_failed'));
    },
  });

  const voteDownMutation = useVoteDownMutation(client, {
    onSuccess: (data) => {
      setIsVoting(false);
      if (data.voteDown?.status === 'true') {
        setVoteStatus('down');
        toast.success(data.voteDown?.message || t('vote.vote_down_success'));
      } else {
        toast.error(data.voteDown?.message || t('vote.vote_down_failed'));
      }
    },
    onError: (error) => {
      setIsVoting(false);
      toast.error(t('vote.vote_down_failed'));
    },
  });

  const handleVoteUp = () => {
    if (isVoting || voteStatus === 'up') return;

    setIsVoting(true);
    voteUpMutation.mutate({
      src_package_name: srcPackageName,
      src_ecosystem: srcEcosystem,
      target_package_name: targetPackageName,
      target_ecosystem: targetEcosystem,
      who_vote: whoVote,
    });
  };

  const handleVoteDown = () => {
    if (isVoting || voteStatus === 'down') return;

    setIsVoting(true);
    voteDownMutation.mutate({
      src_package_name: srcPackageName,
      src_ecosystem: srcEcosystem,
      target_package_name: targetPackageName,
      target_ecosystem: targetEcosystem,
      who_vote: whoVote,
    });
  };

  return (
    <div className="ml-2 flex items-center gap-2">
      <TrackingWrapper
        module="os-selection"
        type="similar_vote_up"
        content={{
          src_package_name: srcPackageName,
          src_ecosystem: srcEcosystem,
          target_package_name: targetPackageName,
          target_ecosystem: targetEcosystem,
          who_vote: whoVote,
        }}
      >
        <button
          onClick={handleVoteUp}
          disabled={isVoting || voteStatus === 'up'}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all ${
            voteStatus === 'up'
              ? 'cursor-not-allowed bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
          } ${isVoting ? 'cursor-not-allowed opacity-50' : ''}`}
          title={t('vote.like')}
        >
          {voteStatus === 'up' ? (
            <AiFillLike className="text-lg" />
          ) : (
            <AiOutlineLike className="text-lg" />
          )}
        </button>
      </TrackingWrapper>

      <TrackingWrapper
        module="os-selection"
        type="similar_vote_down"
        content={{
          src_package_name: srcPackageName,
          src_ecosystem: srcEcosystem,
          target_package_name: targetPackageName,
          target_ecosystem: targetEcosystem,
          who_vote: whoVote,
        }}
      >
        <button
          onClick={handleVoteDown}
          disabled={isVoting || voteStatus === 'down'}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all ${
            voteStatus === 'down'
              ? 'cursor-not-allowed bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
          } ${isVoting ? 'cursor-not-allowed opacity-50' : ''}`}
          title={t('vote.dislike')}
        >
          {voteStatus === 'down' ? (
            <AiFillDislike className="text-lg" />
          ) : (
            <AiOutlineDislike className="text-lg" />
          )}
        </button>
      </TrackingWrapper>
    </div>
  );
};

export default VoteComponent;
