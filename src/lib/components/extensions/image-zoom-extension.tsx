"use client";

import mediumZoom, { Zoom } from "medium-zoom";
import React, { RefObject, useEffect, useRef } from "react";

export function ImageZoomExtension({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const zoomRef = useRef<Zoom>(undefined);

  useEffect(() => {
    const elements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        ".markdown-view:not(.markdown-view-pure) img"
      ) ?? []
    ).filter(
      (x) =>
        x.parentNode?.nodeName !== "A" &&
        !x.className.includes("medium-zoom-image") &&
        !x.parentElement?.classList.contains(".markdown-image-container")
    );

    elements.forEach((el) => {
      const container = document.createElement("div");
      const caption = document.createElement("div");
      const captionText = el.getAttribute("alt");

      container.classList.add("markdown-image-container");
      container.innerHTML = el.outerHTML;

      if (captionText) {
        caption.innerText = el.getAttribute("alt") ?? "";
        caption.classList.add("markdown-img-caption");
        container.appendChild(caption);
      }

      el.parentElement?.replaceChild(container, el);
    });

    // Search images one more time after all DOM manipulations
    zoomRef.current = mediumZoom(
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(
          ".markdown-view:not(.markdown-view-pure) img"
        ) ?? []
      )
    );
    zoomRef.current?.update({ background: "#131111" });

    return () => {
      zoomRef.current?.detach();
    };
  }, []);
  return <></>;
}
