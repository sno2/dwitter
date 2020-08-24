export function urlWithParams(url: string, params: any) {
  const _params = new URLSearchParams();

  for (const key of Object.keys(params)) {
    _params.append(key, params[key]);
  }

  return `${url}?${_params.toString()}`;
}
