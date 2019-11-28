export default function getThumbnailURL(urlTemplate, width, height) {
  return urlTemplate
      .replace("{width}", width)
      .replace("{height}", height);
};
