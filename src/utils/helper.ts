export default function extractIdFromUrl(url: string): string | "" {
  const matches = url.match(/\/(\d+)\/?$/);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return "";
}
