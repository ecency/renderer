export function isWaveLikePost(link: string) {
  const [_, __, ___, permlink] = link.split("/");
  return (
    permlink.includes("re-ecencywaves") ||
    permlink.includes("re-leothreads") ||
    permlink.startsWith("wave-") ||
    permlink.startsWith("re-liketu-moments")
  );
}
