/* eslint-disable @typescript-eslint/no-explicit-any */
export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
}
