"use client";

import React, { RefObject, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./hive-post-link-extension.scss";
import { isWaveLikePost } from "../functions";

// In-memory session cache
const simpleCache = new Map<
    string,
    {
      title: string;
      description: string | undefined;
      image: string | undefined;
    }
>();

export function HivePostLinkRenderer({ link }: { link: string }) {
  const [data, setData] = useState<{
    title: string;
    description?: string;
    image?: string;
  }>();

  const fetchData = useCallback(async () => {
    if (simpleCache.has(link)) {
      setData(simpleCache.get(link));
      return;
    }

    try {
      const response = await fetch(`https://ecency.com${link}`, {
        method: "GET",
      });
      const raw = await response.text();
      const pageDOM = document.createElement("html");
      pageDOM.innerHTML = raw;

      const rawTitle = pageDOM
          .querySelector(`meta[property="og:title"]`)
          ?.getAttribute("content");

      if (rawTitle) {
        const preview = {
          title: rawTitle,
          description: pageDOM
              .querySelector(`meta[property="og:description"]`)
              ?.getAttribute("content")
              ?.substring(0, 71) ?? undefined, // normalized

          image: pageDOM
              .querySelector(`meta[property="og:image"]`)
              ?.getAttribute("content") ?? undefined, // normalized
        };

        simpleCache.set(link, preview);
        setData(preview);
      }
    } catch (e) {
      console.error(`[Ecency Renderer] Failed to fetch preview: ${link}`, e);
    }
  }, [link]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
      <a
          href={link}
          className="ecency-renderer-hive-post-extension-link"
          target="_blank"
          rel="noopener"
      >
        {data ? (
            <>
              <div
                  className="ecency-renderer-hive-post-extension-link-image"
                  style={{ backgroundImage: `url(${data.image})` }}
              />
              <div className="ecency-renderer-hive-post-extension-link-text-content">
                <div className="ecency-renderer-hive-post-extension-link-type">
                  Hive post
                </div>
                <div className="ecency-renderer-hive-post-extension-link-title">
                  {data.title}
                </div>
                <div className="ecency-renderer-hive-post-extension-link-description">
                  {data.description + "..."}
                </div>
              </div>
            </>
        ) : (
            link
        )}
      </a>
  );
}

export function HivePostLinkExtension({
    containerRef,
  }: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const elements = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(
            ".markdown-view:not(.markdown-view-pure) .markdown-post-link"
        ) ?? []
    );

    elements
        .filter((el) => !isWaveLikePost(el.getAttribute("href") ?? ""))
        .filter((el) => {
          try {
            const [_, __, hrefAuthor, hrefPermlink] = new URL(
                `https://ecency.com` + el.getAttribute("href")!
            ).pathname.split("/");
            return el.innerText === `${hrefAuthor}/${hrefPermlink}`;
          } catch (e) {
            return true;
          }
        })
        .forEach((element) => {
          // Prevent multiple injections
          if ((element as HTMLElement).dataset.enhanced === "true") return;
          (element as HTMLElement).dataset.enhanced = "true";

          const container = document.createElement("div");
          container.classList.add("ecency-renderer-hive-post-extension");

          const href = element.getAttribute("href") ?? "";
          const root = createRoot(container);
          root.render(<HivePostLinkRenderer link={href} />);

          element.parentElement?.replaceChild(container, element);
        });
  }, []);

  return null;
}
