"use client";

import React, { RefObject, useCallback, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import "./hive-post-link-extension.scss";
import { isWaveLikePost } from "../functions";

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
    description: string | undefined;
    image: string | undefined;
  }>();

  const fetchData = useCallback(async () => {
    if (simpleCache.has(link)) {
      setData(simpleCache.get(link));
      return;
    }

    try {
      const response = await fetch(`https://ecency.com/${link}`, {
        method: "GET",
      });
      const raw = await response.text();
      const pageDOM = document.createElement("html");
      pageDOM.innerHTML = raw;

      const title =
        pageDOM
          .querySelector(`meta[property="og:title"]`)
          ?.getAttribute("content") ?? undefined;
      const image =
        pageDOM
          .querySelector(`meta[property="og:image"]`)
          ?.getAttribute("content") ?? undefined;
      const description =
        pageDOM
          .querySelector(`meta[property="og:description"]`)
          ?.getAttribute("content")
          ?.substring(0, 71) ?? undefined;

      const isSuccess = !!title;
      if (isSuccess) {
        simpleCache.set(link, { title, description, image });
        setData({ title, image, description });
      }
    } catch (e) {
      console.error(`[Ecency][Renderer] Failed to fetch post preview: ${link}`);
    }
  }, [link]);

  useEffect(() => {
    fetchData();
  }, []);

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
        ".markdown-view:not(.markdown-view-pure) .markdown-post-link",
      ) ?? [],
    );
    elements
      .filter((el) => !isWaveLikePost(el.getAttribute("href") ?? ""))
      .forEach((element) => {
        const container = document.createElement("div");
        container.classList.add("ecency-renderer-hive-post-extension");
        hydrateRoot(
          container,
          <HivePostLinkRenderer link={element.getAttribute("href") ?? ""} />,
        );
        element.parentElement?.replaceChild(container, element);
      });
  }, []);

  return <></>;
}
