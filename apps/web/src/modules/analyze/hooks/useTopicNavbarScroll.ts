import { useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';

const isCardInView = (rect: DOMRect) => {
  const { top, bottom } = rect;
  return (
    top >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

const lookupSiblingTagH1 = (element: HTMLElement) => {
  let sibling: Node | null = element.previousSibling;
  while (sibling) {
    if (
      sibling.nodeType === 1 &&
      (sibling as HTMLElement).tagName.toLowerCase() === 'h1'
    ) {
      return sibling as HTMLElement;
    }
    sibling = sibling.previousSibling;
  }

  return null;
};

function lookupParentSiblingH2(element: HTMLElement): HTMLElement | null {
  let sibling: Node | null = element.previousSibling;

  while (sibling) {
    if (
      sibling.nodeType === 1 &&
      (sibling as HTMLElement).tagName.toLowerCase() === 'h2'
    ) {
      return sibling as HTMLElement;
    }
    sibling = sibling.previousSibling;
  }

  const parentElement = element.parentElement;
  if (parentElement) {
    return lookupParentSiblingH2(parentElement);
  }

  return null;
}

const useTopicNavbarScroll = () => {
  const [inViewCardId, setInViewCardId] = useState('');

  useEffect(() => {
    const scrollEventListener = throttle(() => {
      if (document.documentElement.scrollTop < 190) {
        setInViewCardId('');
        return;
      }

      const list = document.querySelectorAll('.base-card');
      for (let i = 0; i < list.length; i++) {
        const cardEl = list[i];
        const rect = cardEl.getBoundingClientRect();

        if (isCardInView(rect)) {
          const h3 = cardEl.firstChild as HTMLElement;
          if (h3?.id) setInViewCardId(h3?.id);
          return;
        }
      }
    }, 500);

    document.addEventListener('scroll', scrollEventListener);
    return () => {
      document.removeEventListener('scroll', scrollEventListener);
    };
  }, []);

  return useMemo(() => {
    if (!inViewCardId) {
      return { topicTitle: '', subTitle: '' };
    }

    if (inViewCardId === 'topic_overview') {
      return { topicTitle: 'Overview', subTitle: '' };
    }

    let topicTitle = '';
    let subTitle = '';

    const card = document.querySelector('#' + inViewCardId) as HTMLElement;
    const subIdNode = lookupParentSiblingH2(card);
    if (subIdNode) {
      subTitle = subIdNode.innerText.replace('#', '').trim();

      const topicNode = lookupSiblingTagH1(subIdNode);
      if (topicNode) {
        topicTitle = topicNode.innerText.replace('#', '').trim();
      }
    }

    return { topicTitle, subTitle };
  }, [inViewCardId]);
};

export default useTopicNavbarScroll;
