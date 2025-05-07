"use client";

import React, { RefObject, useCallback, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import "./three-speak-video-extension.scss";

export function ThreeSpeakVideoRenderer({
  embedSrc,
  container,
}: {
  embedSrc: string;
  container: HTMLElement;
}) {
  const [show, setShow] = useState(false);

  const playButtonClickHandler = useCallback(() => {
    const v = !show;
    const playButton = container.querySelector(".markdown-video-play");
    const thumbnail = container.querySelector(".video-thumbnail");

    if (playButton) {
      playButton.addEventListener("click", playButtonClickHandler);
      (playButton as HTMLElement).style.display = v ? "none" : "block";
    }

    if (thumbnail) {
      (thumbnail as HTMLElement).style.display = v ? "none" : "block";
    }

    setShow(v);
  }, []);

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
      className="speak-iframe"
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

export function ThreeSpeakVideoExtension({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const elements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        ".markdown-view:not(.markdown-view-pure) .markdown-video-link-speak:not(.ecency-renderer-speak-extension)"
      ) ?? []
    );
    elements.forEach((element) => {
      const container = document.createElement("div");

      container.classList.add("ecency-renderer-speak-extension-frame");
      element.classList.add("ecency-renderer-speak-extension");

      hydrateRoot(
        container,
        <ThreeSpeakVideoRenderer
          embedSrc={element.dataset.embedSrc ?? ""}
          container={element}
        />
      );
      element.appendChild(container);
    });
  }, []);

  return <></>;
}
