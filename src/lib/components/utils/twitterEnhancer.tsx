import { createRoot } from "react-dom/client";
import React from "react";

/**
 * Utility to enhance Twitter links with embedded tweets
 */
export function applyTwitterEmbeds(
    container: HTMLElement,
    ComponentInstance: React.FC<{ id: string }>
) {
    const elements = Array.from(
        container.querySelectorAll<HTMLElement>(
            ".markdown-view:not(.markdown-view-pure) .markdown-external-link"
        )
    ).filter((el) => {
        const href = el.getAttribute("href") || "";
        return href.startsWith("https://x.com") || href.startsWith("https://twitter.com");
    });

    elements.forEach((el) => {
        try {
            if (el.dataset.enhanced === "true") return;
            el.dataset.enhanced = "true";

            const href = el.getAttribute("href");
            if (!href) return;

            const url = new URL(href);
            const tweetId = url.pathname.split("/").pop();
            if (!tweetId) return;

            const wrapper = document.createElement("div");
            wrapper.classList.add("ecency-renderer-twitter-extension-frame");

            el.innerHTML = ""; // clear existing link text
            el.appendChild(wrapper);

            const root = createRoot(wrapper);
            root.render(<ComponentInstance id={tweetId} />);
        } catch (e) {
            console.warn("applyTwitterEmbeds failed to render tweet:", e);
        }
    });
}
