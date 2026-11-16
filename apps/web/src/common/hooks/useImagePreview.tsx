import React, { useState, useEffect, useRef } from 'react';

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const useImagePreview = () => {
  const galleryRef = useRef<Viewer>(null);
  const [element, ref] = useState<HTMLElement>(null);

  useEffect(() => {
    if (element) {
      const gallery = new Viewer(element);
      galleryRef.current = gallery;
      const observer = new MutationObserver(() => {
        gallery.update();
      });
      observer.observe(element, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'alt'],
      });
      return () => {
        observer.disconnect();
        gallery.destroy();
        galleryRef.current = null;
      };
    }
  }, [element]);

  const open = () => {
    galleryRef.current?.show();
  };

  const close = () => {
    galleryRef.current?.destroy();
  };

  return { ref, open, close };
};

export default useImagePreview;
