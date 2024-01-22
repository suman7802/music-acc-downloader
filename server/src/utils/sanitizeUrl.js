export default function sanitizeURL(url) {
  if (url.includes('?list=')) {
    const modifiedUrl = url.split('?list=')[0];
    return modifiedUrl;
  } else {
    return url;
  }
}
