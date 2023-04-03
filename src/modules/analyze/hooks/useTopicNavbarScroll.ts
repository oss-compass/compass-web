import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

const useTopicNavbarScroll = () => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    document.addEventListener('scroll', scrollEventListener);
    return () => {
      document.removeEventListener('scroll', scrollEventListener);
    };
  }, []);
  const scrollEventListener = () => {
    const list = document.querySelectorAll('.base-card');
    for (let i = 0; i < list.length; i++) {
      const { top, bottom } = list[i].getBoundingClientRect();
      if ((top < 0 && bottom > 250) || top > 0) {
        const h3 = list[i].firstChild as HTMLElement;
        setActiveId(h3.id);
        break;
      }
    }
  };
  useDebounce(scrollEventListener, 100);
  return useMemo(() => {
    if (!activeId) {
      return { topicId: '', subId: '' };
    } else if (activeId === 'topic_overview') {
      return {
        topicId: 'Overview',
        subId: '',
      };
    } else {
      const parent = document.querySelector('#' + activeId)!.parentNode!
        .parentNode;
      let h2: HTMLElement;
      if (parent!.previousSibling!.nodeName === 'H2') {
        h2 = parent!.previousSibling as HTMLElement;
      } else {
        h2 = parent!.previousSibling!.previousSibling as HTMLElement;
      }
      let pre = h2!.previousSibling as HTMLElement;
      while (pre!.nodeName !== 'H1') {
        pre = pre!.previousSibling as HTMLElement;
      }
      const topic = pre!.innerText.replace('#', '').trim();
      return { topicId: topic, subId: h2.innerText.replace('#', '') };
    }
  }, [activeId]);
};

export default useTopicNavbarScroll;
