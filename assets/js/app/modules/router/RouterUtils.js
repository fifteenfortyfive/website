import { navigate } from 'hookrouter';

export function getHostname() {
  return window.location.hostname;
}

export function isLocalUrl(url) {
  return !/(?:^[a-z][a-z0-9+.-]*:|\/\/)/.test(url);
}

export function navigateTo(path, replace = true, queryParams = {}) {
  return navigate(path, replace, queryParams);
}
