import { createRoot } from "react-dom/client";
import { HivePostLinkRenderer } from "../extensions";

export function applyHivePostLinks(container: HTMLElement) {
    const elements = Array.from(
        container.querySelectorAll<HTMLElement>(
            ".markdown-view:not(.markdown-view-pure) .markdown-post-link"
        )
    );

    elements
        .filter((el) => el.dataset.isInline === "false")
        .forEach((el) => {
        if (el.dataset.enhanced === "true") return;
        el.dataset.enhanced = "true";

        const link = el.getAttribute("href") ?? "";
        const wrapper = document.createElement("div");
        wrapper.classList.add("ecency-renderer-hive-post-extension");

        const root = createRoot(wrapper);
        root.render(<HivePostLinkRenderer link={link} />);

        el.parentElement?.replaceChild(wrapper, el);
    });
}
