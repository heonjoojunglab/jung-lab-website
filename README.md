# 정헌주 교수 개인 홈페이지

연세대학교 행정학과 정헌주 교수의 개인 소개 홈페이지입니다. 빌드 도구 없이 HTML/CSS/JS
파일만으로 만들어져서, 폴더째로 어디에든 올리면 바로 동작합니다.

## 폴더 구성

```
Jung-lab-website/
├── index.html       페이지 전체
├── css/style.css    스타일
├── js/main.js       언어 전환 + 미디어 보도 자동 갱신
└── assets/
    ├── images/      프로필 사진
    └── files/       이력서 PDF
```

## 미리보기 (내 컴퓨터에서 확인하기)

1. `index.html` 파일을 더블클릭해서 바로 열어도 대부분 잘 동작합니다.
2. 다만 "미디어 보도" 자동 갱신은 브라우저에 따라 파일을 직접 열었을 때(`file://`) 막힐 수 있어서,
   아래처럼 간단한 로컬 서버로 띄워서 보는 걸 권장합니다:
   ```powershell
   cd Jung-lab-website
   python -m http.server 8765
   ```
   그다음 브라우저에서 `http://localhost:8765` 접속.

## 내용 수정하는 법

- **소개글·경력·연구 내용 수정**: `index.html`을 텍스트 에디터로 열어서 원하는 부분을 찾아
  고치면 됩니다. 한국어 문장은 `class="lang-ko"`가 붙은 부분, 영어 문장은 `class="lang-en"`가
  붙은 부분에 있습니다 — 항상 두 언어 버전을 같이 고쳐주세요 (하나만 고치면 언어를 전환했을 때
  다른 쪽이 예전 내용 그대로 보입니다).
- **논문 추가**: `index.html`에서 `<section class="section" id="publications">`를 찾아,
  해당 주제의 `<details class="pub-group">` 안 `<ol>` 목록에 `<li>` 한 줄 추가.
- **연구과제 추가**: `<table class="project-table">`의 `<tbody>`에 `<tr>` 한 줄 추가.
- **프로필 사진 교체**: `assets/images/profile.jpg`를 새 사진으로 바꾸면 됩니다(가로 900px
  정도가 적당).
- **미디어 보도 검색어 조정**: `js/main.js` 맨 위 `SEARCH_QUERY` 값을 바꾸면 자동으로 찾는
  기사 범위가 바뀝니다.

## 인터넷에 실제로 올리기 (배포)

아직 진행 전입니다. GitHub Pages나 Netlify에 무료로 올릴 수 있는데, 원하시면 도와드리겠습니다.
