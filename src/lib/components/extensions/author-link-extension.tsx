"use client";

import React, { useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import "./author-link-extension.scss";

export function AuthorLinkRenderer({ author }: { author: string }) {
  const imageSrc = `https://images.ecency.com/u${author.replace("@", "")}/avatar/small`;

  return (
    <>
      <img
        src={imageSrc}
        className="ecency-renderer-author-extension-link-image"
        alt={author}
      />
      <div className="ecency-renderer-author-extension-link-content">
        <span className="ecency-renderer-author-extension-link-content-label">
          Hive account
        </span>
        <span>{author.replace("/", "")}</span>
      </div>
    </>
  );
}

export function AuthorLinkExtension() {
  useEffect(() => {
    const elements = [
      ...Array.from(
        document.querySelectorAll<HTMLElement>(
          ".markdown-view:not(.markdown-view-pure) .markdown-author-link",
        ),
      ),
    ];
    elements.forEach((element) => {
      const container = document.createElement("a");

      container.setAttribute("href", element.getAttribute("href") ?? "");
      container.setAttribute("target", "_blank");
      container.setAttribute("rel", "noopener");

      container.classList.add("ecency-renderer-author-extension");
      container.classList.add("ecency-renderer-author-extension-link");

      hydrateRoot(
        container,
        <AuthorLinkRenderer author={element.getAttribute("href") ?? ""} />,
      );
      element.parentElement?.replaceChild(container, element);
    });
  }, []);

  return <></>;
}
