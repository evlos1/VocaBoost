# VocaBoost

VocaBoost는 단어 학습을 도와주는 웹 애플리케이션입니다.

## 주요 기능

- 단어 카드 학습
- 퀴즈 기능
- 학습 진도 추적
- 맞춤형 학습 계획

## 시작하기

### 필수 조건

- Node.js (v14 이상)
- npm 또는 yarn

### 설치

```bash
# 관리자 권한으로 PowerShell을 실행
# Windows 시작 메뉴에서 "PowerShell"을 검색
# 마우스 우클릭 후 "관리자 권한으로 실행" 선택

# 관리자 PowerShell에서 다음 명령을 실행:
Set-ExecutionPolicy RemoteSigned

# 그런 다음 일반 PowerShell 창을 열고 프로젝트 디렉토리로 이동:
cd C:\Users\user\VocaBoost

# 의존성 설치
npm install styled-components @mui/material @emotion/react @emotion/styled
npm install --save gh-pages

# 개발 서버 실행
npm start
```

### 빌드

```bash
npm run build
```

## 기술 스택

- React
- React Router
- Styled Components
- Jest
- React Testing Library 