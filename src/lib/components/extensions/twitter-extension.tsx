"use client";

import React, { RefObject, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { TwitterTweetEmbed } from "react-twitter-embed";

export function TwitterExtension({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const elements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        ".markdown-view:not(.markdown-view-pure) .markdown-external-link"
      ) ?? []
    );
    elements
      .filter(
        (el) =>
          el.getAttribute("href")?.startsWith("https://x.com") ||
          el.getAttribute("href")?.startsWith("https://twitter.com")
      )
      .forEach((element) => {
        let tweetId: string | undefined = undefined;
        const container = document.createElement("div");
        try {
          const [_, __, ___, id] = URL.parse(
            element.getAttribute("href")!
          )!.pathname.split("/");
          tweetId = id;
        } catch (e) {}

        if (!tweetId) {
          return;
        }

        container.classList.add("ecency-renderer-twitter-extension-frame");
        element.classList.add("ecency-renderer-twitter-extension");

        hydrateRoot(container, <TwitterTweetEmbed tweetId={tweetId} />);
        element.innerHTML = "";
        element.appendChild(container);
      });
  }, []);

  return <></>;
}
