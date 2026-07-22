type HeadersLike = {
  get(name: string): string | null;
};

export function getCountryCode(headers: HeadersLike): string | null {
  const countryCode =
    headers.get("x-vercel-ip-country") ??
    headers.get("x-nextjs-country") ??
    headers.get("cf-ipcountry") ??
    headers.get("x-nf-client-geo-country") ??
    null;

  return countryCode ? countryCode.toUpperCase() : null;
}

export function userIsVen(headers: HeadersLike): boolean {
  return getCountryCode(headers) === "VE";
}
