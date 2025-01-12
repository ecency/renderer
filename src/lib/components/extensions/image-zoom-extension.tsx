"use client";

import React, { useEffect, useRef } from "react";
import mediumZoom, { Zoom } from "medium-zoom";

export function ImageZoomExtension() {
  const zoomRef = useRef<Zoom>(undefined);

  useEffect(() => {
    const elements = [
      ...Array.from(
        document.querySelectorAll<HTMLElement>(
          ".markdown-view:not(.markdown-view-pure) img",
        ),
      ),
    ].filter(
      (x) =>
        x.parentNode?.nodeName !== "A" &&
        !x.className.includes("medium-zoom-image"),
    );
    console.log(elements);
    zoomRef.current = mediumZoom(elements);
    zoomRef.current?.update({ background: "#131111" });

    return () => {
      zoomRef.current?.detach();
    };
  }, []);
  return <></>;
}
