// SPDX-License-Identifier: AGPL-3.0-or-later
/**
 * Tệp lớn (vài chục MB) không được mirror về kho nên href vẫn là link CDN của Zalo.
 * /media/download chỉ biết link trong kho → trả 400 "URL không thuộc kho" và người dùng thấy
 * "Tải tệp lỗi". Cho phép proxy các host CDN tệp của Zalo — chỉ HTTPS và đúng danh sách host
 * (chống SSRF: không bao giờ proxy host tuỳ ý).
 */
const ZALO_FILE_HOST_SUFFIXES = ['dlfl.vn', 'zdn.vn', 'zadn.vn', 'zaloapp.com', 'zalo.me'];

export function isAllowedExternalFileUrl(value: string): boolean {
  let u: URL;
  try { u = new URL(value); } catch { return false; }
  if (u.protocol !== 'https:' || u.username || u.password || u.port) return false;
  const host = u.hostname.toLowerCase();
  return ZALO_FILE_HOST_SUFFIXES.some((s) => host === s || host.endsWith('.' + s));
}
