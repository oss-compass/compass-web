import { proxy } from 'valtio';

export type TopicType = 'collaboration' | 'contributor' | null;
export const useTopicType = proxy<{
  topicType: TopicType;
}>({
  topicType: 'collaboration',
});

export const setTopicType = (v: TopicType) => {
  useTopicType.topicType = v;
};
