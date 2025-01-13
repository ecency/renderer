"use client";

import React, { RefObject, useEffect, useRef } from "react";
import mediumZoom, { Zoom } from "medium-zoom";

export function ImageZoomExtension({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const zoomRef = useRef<Zoom>(undefined);

  useEffect(() => {
    const elements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        ".markdown-view:not(.markdown-view-pure) img",
      ) ?? [],
    ).filter(
      (x) =>
        x.parentNode?.nodeName !== "A" &&
        !x.className.includes("medium-zoom-image"),
    );
    zoomRef.current = mediumZoom(elements);
    zoomRef.current?.update({ background: "#131111" });

    return () => {
      zoomRef.current?.detach();
    };
  }, []);
  return <></>;
}
