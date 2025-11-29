# Somoim Factory (소모임 팩토리)

이 프로젝트는 [Next.js](https://nextjs.org)로 생성된 프로젝트입니다.

> **참고:** 이 프로젝트의 모든 문서는 **한국어**로 작성하는 것을 원칙으로 합니다.

## 시작하기 (Getting Started)

개발 서버를 실행하려면 다음 명령어를 사용하세요:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

`app/page.tsx` 파일을 수정하여 페이지 편집을 시작할 수 있습니다. 파일을 수정하면 페이지가 자동으로 업데이트됩니다.

이 프로젝트는 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)를 사용하여 Vercel의 새로운 글꼴 제품군인 [Geist](https://vercel.com/font)를 자동으로 최적화하고 로드합니다.

## 더 알아보기 (Learn More)

Next.js에 대해 더 알아보려면 다음 리소스를 참조하세요:

- [Next.js 문서](https://nextjs.org/docs) - Next.js의 기능과 API에 대해 알아보세요.
- [Next.js 배우기](https://nextjs.org/learn) - 대화형 Next.js 튜토리얼입니다.

[Next.js GitHub 저장소](https://github.com/vercel/next.js)를 확인하실 수 있습니다. 피드백과 기여는 언제나 환영합니다!

## Vercel에 배포하기 (Deploy on Vercel)

Next.js 앱을 배포하는 가장 쉬운 방법은 Next.js 제작자가 만든 [Vercel 플랫폼](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 사용하는 것입니다.

자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 확인하세요.

## 문제 해결 (Troubleshooting)

### Hydration Error (서버/클라이언트 불일치)

브라우저 확장 프로그램(예: 번역기, 패스워드 매니저 등)이 HTML에 속성을 주입할 때, 서버에서 렌더링된 HTML과 클라이언트의 HTML이 일치하지 않아 Hydration Error가 발생할 수 있습니다.

**해결 방법:**
`src/app/layout.tsx` 파일의 `<html>` 태그에 `suppressHydrationWarning` 속성을 추가하여 경고를 무시하도록 설정합니다.

```tsx
<html lang="en" suppressHydrationWarning>
```
