/**
 * Prepends the Vite base URL to a public asset path.
 * This ensures images work both locally and on GitHub Pages.
 *
 * Usage: asset('/images/team/photo.png')
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL; // '/' locally, '/SAST_A_NEW_REALM/' on GH Pages
  // Avoid double slashes
  return base.replace(/\/$/, "") + path;
}
