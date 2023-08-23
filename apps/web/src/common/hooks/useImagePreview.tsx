import React, { useState, useEffect, useRef } from 'react';

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const useImagePreview = () => {
  const galleryRef = useRef<Viewer>(null);
  const [element, ref] = useState<HTMLElement>(null);

  useEffect(() => {
    if (element) {
      galleryRef.current = new Viewer(element);
      return () => {
        galleryRef.current?.destroy();
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
