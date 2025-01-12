import React, { HTMLProps } from "react";
import { renderPostBody } from "@ecency/render-helper";
import { clsx } from "clsx";
import { ImageZoomExtension } from "./extensions";

interface Props {
  value: string;
  pure?: boolean;
}

export function EcencyRenderer({
  value,
  pure = false,
  ...other
}: HTMLProps<HTMLDivElement> & Props) {
  return (
    <>
      <div
        {...other}
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
          <ImageZoomExtension />
        </>
      )}
    </>
  );
}
