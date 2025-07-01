import {
    applyImageZoom,
    applyHivePostLinks,
    applyAuthorLinks,
    applyHiveOperations,
    applyTagLinks,
    applyYoutubeVideos,
    applyThreeSpeakVideos,
    applyWaveLikePosts,
    applyTwitterEmbeds
} from "../utils";

export function setupPostEnhancements(container: HTMLElement, options?: {
    onHiveOperationClick?: (op: string) => void,
    TwitterComponent?: any
}) {
    applyImageZoom(container);
    applyHivePostLinks(container);
    applyAuthorLinks(container);
    applyHiveOperations(container, options?.onHiveOperationClick);
    applyTagLinks(container);
    applyYoutubeVideos(container);
    applyThreeSpeakVideos(container);
    applyWaveLikePosts(container);

    applyTwitterEmbeds(container, options?.TwitterComponent ?? (() => `<div>Failed to render Twitter</div>`));
}
