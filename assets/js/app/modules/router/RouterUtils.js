export function getHostname() {
  return window.location.hostname;
}

export function isLocalUrl(url) {
  return !/(?:^[a-z][a-z0-9+.-]*:|\/\/)/.test(url);
}
