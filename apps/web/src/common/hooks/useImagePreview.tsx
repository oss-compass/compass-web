import React, { useState, useEffect, useRef } from 'react';

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const useImagePreview = () => {
  const galleryRef = useRef<Viewer>(null);
  const [element, ref] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element || galleryRef.current) return;
    const viewer = new Viewer(element);
    galleryRef.current = viewer;
    return () => {
      // close() can destroy the viewer before React unmounts the element.
      // Only the active instance should be destroyed by effect cleanup.
      if (galleryRef.current === viewer) {
        viewer.destroy();
        galleryRef.current = null;
      }
    };
  }, [element]);

  const open = () => {
    if (!galleryRef.current && element) {
      galleryRef.current = new Viewer(element);
    }
    galleryRef.current?.show();
  };

  const close = () => {
    const viewer = galleryRef.current;
    if (!viewer) return;
    viewer.destroy();
    galleryRef.current = null;
  };

  return { ref, open, close };
};

export default useImagePreview;
