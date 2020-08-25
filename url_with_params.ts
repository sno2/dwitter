export function urlWithParams(url: string, params: any) {
  const _params = new URLSearchParams();

  for (const key of Object.keys(params)) {
    let value = params[key];

    if (value.constructor === Array) {
      value = value.join(",");
    }

    _params.append(key, value);
  }

  return `${url}?${_params.toString()}`;
}
