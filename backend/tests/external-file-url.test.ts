import { describe, it, expect } from 'vitest';
import { isAllowedExternalFileUrl } from '../src/modules/media/external-file-url.js';

describe('isAllowedExternalFileUrl', () => {
  it('chấp nhận CDN tệp của Zalo qua HTTPS', () => {
    expect(isAllowedExternalFileUrl('https://file-stal-11.dlfl.vn/gr/ee2c/abc')).toBe(true);
    expect(isAllowedExternalFileUrl('https://zalo-file-dl.zdn.vn/x')).toBe(true);
  });
  it('từ chối host lạ, http, host giả, cổng/tài khoản trong URL', () => {
    expect(isAllowedExternalFileUrl('http://file.dlfl.vn/x')).toBe(false);
    expect(isAllowedExternalFileUrl('https://evil.com/dlfl.vn')).toBe(false);
    expect(isAllowedExternalFileUrl('https://notdlfl.vn/x')).toBe(false);
    expect(isAllowedExternalFileUrl('https://dlfl.vn.evil.com/x')).toBe(false);
    expect(isAllowedExternalFileUrl('https://u:p@file.dlfl.vn/x')).toBe(false);
    expect(isAllowedExternalFileUrl('https://file.dlfl.vn:8443/x')).toBe(false);
    expect(isAllowedExternalFileUrl('https://127.0.0.1/x')).toBe(false);
    expect(isAllowedExternalFileUrl('không phải url')).toBe(false);
  });
});
