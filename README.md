<<<<<<< HEAD
# 9oormthonUNIV_JNU Landing Page

## 🫱🏻‍🫲🏻 GitHub rule

PUSH

1. git checkout feat_본인이름
2. local에서 본인 branch에서 작업 후
git add (작업파일)
git commit
git push origin feat_이름 으로 원격 레포에 올리기
3. 원격 레포에서 main로 PR 보내기

PULL

git pull origin main으로 가져오기

⚠️ 주의사항
- 공통 컴포넌트 및 파일 수정 시 서로 작업 내용 겹치지 않게 주의!!
- 공통 파일 수정 혹은 라이브러리 설치 시 미리 알리기
- PR 보낸 후 알려주고 확인 후 merge 승인

https://velog.io/@chayezo/Git-Github-%EC%9B%90%EA%B2%A9-%EC%A0%80%EC%9E%A5%EC%86%8C-%EC%97%B0%EA%B2%B0-%EB%B0%8F-%EB%B8%8C%EB%9E%9C%EC%B9%98-add-commit-push-pull
<br></br>
## 🤙🏻Git Commit Convention

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor : 코드 리펙토링
- test : 테스트 코드, 리펙토링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정

https://velog.io/@shin6403/Git-git-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
>>>>>>> d28d541 (first commit)
