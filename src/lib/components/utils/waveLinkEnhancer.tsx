import { createRoot } from "react-dom/client";
import { WaveLikePostRenderer } from "../extensions";
import { isWaveLikePost } from "../functions";

/**
 * Progressive DOM enhancer for wave-like post links
 */
export function applyWaveLikePosts(container: HTMLElement) {
    const elements = Array.from(
        container.querySelectorAll<HTMLElement>(
            ".markdown-view:not(.markdown-view-pure) .markdown-post-link"
        )
    ).filter((el) => isWaveLikePost(el.getAttribute("href") ?? ""));

    elements.forEach((el) => {
        if (el.dataset.enhanced === "true") return;
        el.dataset.enhanced = "true";

        const link = el.getAttribute("href") ?? "";

        const wrapper = document.createElement("div");
        wrapper.classList.add("ecency-renderer-wave-like-extension");

        const root = createRoot(wrapper);
        root.render(<WaveLikePostRenderer link={link} />);

        el.parentElement?.replaceChild(wrapper, el);
    });
}
