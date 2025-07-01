import {
    AuthorLinkExtension,
    HiveOperationExtension,
    HivePostLinkExtension,
    ImageZoomExtension,
    TagLinkExtension,
    WaveLikePostExtension,
    YoutubeVideoExtension,
    ThreeSpeakVideoExtension,
    TwitterExtension
} from "./extensions";

export function setupPostEnhancements(container: HTMLElement, options?: {
    onHiveOperationClick?: (op: string) => void,
    TwitterComponent?: any
}) {
    ImageZoomExtension({ containerRef: { current: container } });
    HivePostLinkExtension({ containerRef: { current: container } });
    AuthorLinkExtension({ containerRef: { current: container } });
    TagLinkExtension({ containerRef: { current: container } });
    YoutubeVideoExtension({ containerRef: { current: container } });
    ThreeSpeakVideoExtension({ containerRef: { current: container } });
    WaveLikePostExtension({ containerRef: { current: container } });
    TwitterExtension({
        containerRef: { current: container },
        ComponentInstance: options?.TwitterComponent ?? (() => <div>No twitter</div>),
    });
    HiveOperationExtension({
        containerRef: { current: container },
        onClick: options?.onHiveOperationClick
    });
}
