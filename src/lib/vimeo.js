/** Lightweight Vimeo thumbnail (no API round-trip). */
export function vimeoThumbnail(vimeoId) {
  return `https://vumbnail.com/${vimeoId}.jpg`;
}

/** Background loop embed for hero cards. */
export function vimeoBackgroundEmbed(vimeoId, { mobile = false } = {}) {
  const quality = mobile ? "360p" : "540p";
  const params = new URLSearchParams({
    autoplay: "1",
    muted: "1",
    background: "1",
    loop: "1",
    transparent: "0",
    quality,
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${vimeoId}?${params}`;
}

/** Full player for lightbox. */
export function vimeoPlayerEmbed(vimeoId, { mobile = false } = {}) {
  const params = new URLSearchParams({
    autoplay: "1",
    color: "C8FF00",
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
  });
  if (mobile) params.set("quality", "540p");
  return `https://player.vimeo.com/video/${vimeoId}?${params}`;
}
