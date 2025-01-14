import React, { HTMLProps, useRef } from "react";
import { renderPostBody } from "@ecency/render-helper";
import { clsx } from "clsx";
import {
  AuthorLinkExtension,
  HivePostLinkExtension,
  ImageZoomExtension,
  TagLinkExtension,
  YoutubeVideoExtension,
} from "./extensions";
import { ThreeSpeakVideoExtension } from "./extensions/three-speak-video-extension";

interface Props {
  value: string;
  pure?: boolean;
}

export function EcencyRenderer({
  value,
  pure = false,
  ...other
}: HTMLProps<HTMLDivElement> & Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        {...other}
        ref={ref}
        itemProp="articleBody"
        className={clsx(
          "entry-body markdown-view user-selectable",
          pure ? "markdown-view-pure" : "",
          other.className,
        )}
        dangerouslySetInnerHTML={{ __html: renderPostBody(value, false) }}
      />
      {!pure && (
        <>
          <ImageZoomExtension containerRef={ref} />
          <HivePostLinkExtension containerRef={ref} />
          <AuthorLinkExtension containerRef={ref} />
          <TagLinkExtension containerRef={ref} />
          <YoutubeVideoExtension containerRef={ref} />
          <ThreeSpeakVideoExtension containerRef={ref} />
        </>
      )}
    </>
  );
}
