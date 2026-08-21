/*
  예전 GitHub Pages 법적 문서 주소를 현재 원본(goyo.sleite.com)으로 연결합니다.

  이 저장소에는 법적 문서 사본을 두지 않습니다. 이미 콘솔과 앱에 등록된 URL을
  깨뜨리지 않기 위한 호환용 리디렉트만 유지합니다.
*/
import { readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARCHIVED = new Set(['birthday-chemistry']);
const slugs = readdirSync(ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'tools')
  .map((entry) => entry.name)
  .filter((slug) => !ARCHIVED.has(slug))
  .sort();

function redirectPage(target, label) {
  const escapedTarget = target.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=${escapedTarget}">
<link rel="canonical" href="${escapedTarget}">
<title>${label} 이동 안내</title>
</head>
<body>
<p>${label}의 공식 주소가 바뀌었습니다. <a href="${escapedTarget}">새 문서 열기</a></p>
<script>location.replace(${JSON.stringify(target)})</script>
</body>
</html>
`;
}

for (const slug of slugs) {
  const base = `https://goyo.sleite.com/ko`;
  writeFileSync(join(ROOT, slug, 'privacy.html'), redirectPage(`${base}/privacy/${slug}`, '개인정보처리방침'));
  writeFileSync(join(ROOT, slug, 'terms.html'), redirectPage(`${base}/terms/${slug}`, '서비스 이용약관'));
  writeFileSync(join(ROOT, slug, 'index.html'), redirectPage(`${base}/privacy/${slug}`, '법적 문서'));
}

writeFileSync(join(ROOT, 'index.html'), redirectPage('https://goyo.sleite.com/ko/privacy', '앱별 법적 문서'));

console.log(`호환 리디렉트 ${slugs.length}개 앱 생성 완료`);
