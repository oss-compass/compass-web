import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import {
  useCollaborationDevelopmentIndex,
  useCommunityActivity,
  useCommunityServiceAndSupport,
  useOrganizationsActivity,
  Topic,
} from './config';

const useHashchangeEvent = () => {
  const collaborationDevelopmentIndex = useCollaborationDevelopmentIndex();
  const communityActivity = useCommunityActivity();
  const communityServiceAndSupport = useCommunityServiceAndSupport();
  const organizationsActivity = useOrganizationsActivity();

  const initialHash = window.location.hash ? window.location.hash.slice(1) : '';
  const [activeId, setActiveId] = useState(initialHash);

  useEffect(() => {
    const hashChangeHandle = (e: HashChangeEvent) => {
      const hash = window.location.hash;
      if (!hash) return;
      console.log('hashChangeHandle', hash);

      const id = hash.replace('#', '');
      setActiveId(id);
    };
    // hashChangeHandle();
    window.addEventListener('hashchange', hashChangeHandle, false);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandle, false);
    };
  }, []);

  useDebounce(
    () => {
      if (!activeId) return;
      const el = document.getElementById(activeId)?.parentElement;
      if (!el) return;

      const cards = document.querySelectorAll('.base-card');
      cards.forEach((card) => {
        card.setAttribute('style', 'border-color: transparent');
      });
      if (el.classList.contains?.('base-card')) {
        el.setAttribute('style', 'border-color: #505050');
      }
    },
    150,
    [activeId]
  );

  return useMemo(() => {
    return [
      collaborationDevelopmentIndex,
      communityServiceAndSupport,
      communityActivity,
      organizationsActivity,
    ].reduce<{ topicId: string; menuId: string; subMenuId: string }>(
      (acc, cur) => {
        const { topic, id, groups } = cur;

        const item = (groups as { name: string; id: string }[]).find(
          (item) => item.id === activeId
        );
        // submenu
        if (item) {
          return { topicId: topic, menuId: cur.id, subMenuId: item.id || '' };
        }

        if (id === activeId) {
          return { topicId: topic, menuId: cur.id, subMenuId: '' };
        }

        // topic
        if (topic === activeId) {
          return { topicId: topic, menuId: '', subMenuId: '' };
        }

        return acc;
      },
      { topicId: '', menuId: '', subMenuId: '' }
    );
  }, [
    activeId,
    collaborationDevelopmentIndex,
    communityActivity,
    communityServiceAndSupport,
    organizationsActivity,
  ]);
};

export default useHashchangeEvent;
