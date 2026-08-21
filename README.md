# 토스 미니앱 약관 옛 주소 호환 저장소

법적 문서의 현재 원본은 `/Users/jeongwoo/orca/notes/goyo-site/legal/apps.json` 하나입니다.
공식 주소는 아래 두 가지입니다.

```
https://goyo.sleite.com/ko/terms/<appName>
https://goyo.sleite.com/ko/privacy/<appName>
```

이 저장소는 과거에 콘솔과 앱에 등록한 GitHub Pages 주소를 깨뜨리지 않기 위한
**호환용 리디렉트만** 유지합니다. 약관 내용을 이곳에서 직접 고치지 마세요.

GitHub Pages 로 서빙합니다. `main` 에 push 하면 자동 배포돼요.

## ⛔ 비공개로 바꾸지 마세요 (2026-08-07 실제로 해 보고 되돌림)

**무료 플랜에서는 비공개 저장소로 GitHub Pages 를 못 씁니다.** 비공개로 바꾸는 순간
**Pages 설정 자체가 삭제되고**, 사이트가 통째로 404 가 됩니다 — 이 저장소 하나에
세 앱(쑥쑥가든·데일리 브레인·타로)의 약관이 다 들어 있어서 **셋 다 같이 죽습니다.**

⚠️ 바꾼 직후에는 CDN 캐시 때문에 잠깐 200 이 나옵니다. **살아 있다고 착각하기 쉽습니다.**

되돌리는 법 (겪었을 때):
1. `gh repo edit <repo> --visibility public --accept-visibility-change-consequences`
2. `gh api -X POST repos/<repo>/pages -f 'source[branch]=main' -f 'source[path]=/'`
3. **빈 커밋을 하나 push** 해 새 빌드를 태웁니다 — 2번만으로는 빌드가 안 끝났습니다
4. 모든 앱의 terms/privacy 가 200 인지 확인

여기 담기는 것은 공개 리디렉트뿐이며 비밀값은 들어가지 않습니다.

```
https://jw0525.github.io/toss-legal/<appName>/terms.html
https://jw0525.github.io/toss-legal/<appName>/privacy.html
```

## 리디렉트 갱신

```
node tools/build-legacy-redirects.mjs
```

새 앱의 법적 문서는 이 저장소에 추가하지 않습니다.

약관 내용을 바꿀 때는 `goyo-site` 원본과 시행일을 고친 뒤 생성·검사·배포합니다.
