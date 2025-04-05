"use client";

import React, { RefObject, useCallback, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { clsx } from "clsx";
import "./youtube-video-extension.scss";

export function VimeoVideoRenderer({
  embedSrc,
  container,
}: {
  embedSrc: string;
  container: HTMLElement;
}) {
  const [show, setShow] = useState(false);

  const playButtonClickHandler = useCallback(() => setShow((v) => !v), []);

  useEffect(() => {
    container
      .querySelector(".markdown-video-play")
      ?.addEventListener("click", playButtonClickHandler);
    return () => {
      container
        .querySelector(".markdown-video-play")
        ?.removeEventListener("click", playButtonClickHandler);
    };
  }, []);

  return show ? (
    <iframe
      className={clsx("vimeo-iframe", show && "vimeo-iframe-show")}
      width="100%"
      height="200"
      src={`${embedSrc}`}
      title="Video player"
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen={true}
    />
  ) : (
    <></>
  );
}

export function VimeoVideoExtension({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const elements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        ".markdown-view:not(.markdown-view-pure) .markdown-video-link-vimeo:not(.ecency-renderer-vimeo-extension)"
      ) ?? []
    );
    elements.forEach((element) => {
      const container = document.createElement("div");

      container.classList.add("ecency-renderer-vimeo-extension-frame");
      element.classList.add("ecency-renderer-vimeo-extension");

      hydrateRoot(
        container,
        <VimeoVideoRenderer
          embedSrc={element.dataset.embedSrc ?? ""}
          container={element}
        />
      );
      element.appendChild(container);
    });
  }, []);

  return <></>;
}
