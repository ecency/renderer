export function ImageZoomExtension({
 containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const zoomRef = useRef<Zoom>(undefined);

  useEffect(() => {
    const elements = Array.from(
        containerRef.current?.querySelectorAll<HTMLImageElement>(
            ".markdown-view:not(.markdown-view-pure) img"
        ) ?? []
    ).filter(
        (x) =>
            x.parentNode?.nodeName !== "A" &&
            !x.classList.contains("medium-zoom-image") &&
            !x.parentElement?.classList.contains("markdown-image-container")
    );

    elements.forEach((el) => {
      const container = document.createElement("div");
      container.classList.add("markdown-image-container");

      const clonedImage = el.cloneNode(true) as HTMLImageElement;

      const title = el.getAttribute("title")?.trim();
      const dataCaption = el.getAttribute("data-caption")?.trim();
      const alt = el.getAttribute("alt")?.trim();

      // Check if alt looks like a filename
      const isAltFilename = alt
          ? /^[\w,\s-]+\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(alt)
          : false;

      // Use title > data-caption > alt (only if not filename)
      const captionText = title || dataCaption || (!isAltFilename ? alt : "");

      if (captionText) {
        const caption = document.createElement("div");
        caption.classList.add("markdown-img-caption");
        caption.innerText = captionText;
        container.appendChild(clonedImage);
        container.appendChild(caption);
      } else {
        container.appendChild(clonedImage);
      }

      el.parentElement?.replaceChild(container, el);
    });

    // Attach medium-zoom after DOM mutation
    zoomRef.current = mediumZoom(
        Array.from(
            containerRef.current?.querySelectorAll<HTMLImageElement>(
                ".markdown-view:not(.markdown-view-pure) img"
            ) ?? []
        ).filter(
            (x) =>
                !x.closest(".markdown-image-container") &&
                !x.classList.contains("medium-zoom-image")
        )
    );
    zoomRef.current?.update({ background: "#131111" });

    return () => {
      zoomRef.current?.detach();
    };
  }, []);

  return <></>;
}
