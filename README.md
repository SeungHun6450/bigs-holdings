# (주)빅스 홀딩스 사전 과제

실행 방법
1. yarn install
2. yarn dev
3. localhost:3000으로 접속하여 테스트

## 1. 사용한 기술 스택
1. Next.js : 14.1.3 버전 사용
2. Typescript
3. Mobx: 클라이언트 상태 관리를 위해 회사에서 사용하는 스택으로 구현
4. Tanstack query(react-query): 서버 상태 관리를 위해, 데이터 캐싱으로 api호출 빈도 감소를 위해 선택
5. TailwindCss : Scss와 Styled-Component로 구현하는 속도 보다 빠르게 디자인하고 개발하기 위해 선택
6. Shadcn/ui : TailwindCss가 기반이 되는 라이브러리로 페이지네이션 ui에 사용

## 2. 구현 내용

1. 로그인 회원가입 기능 구현
2. 게시판 CRUD 기능 구현 및 게시판 상세보기 구현
3. 반응형으로 제작 (PC, Tablet, Mobile)
4. 헤더에 로그인한 사용자 정보 표시
5. 로그아웃 기능 구현
6. 헤더의 아이콘 클릭 시, 로그인 유무에 따라 게시판 리스트 화면 또는 메인 화면으로 이동
7. 게시판 리스트의 가운데 문구 클릭 시, 게시판 리스트 page=0으로 이동
8. 게시판 상세 보기에 뒤로가기 버튼 추가


## 3. 구현 이미지 (PC와 Mobile)

### 메인화면
![image](https://github.com/user-attachments/assets/cd13caae-5a76-4dbc-95f1-26cd00ec1531)
![image](https://github.com/user-attachments/assets/f072b059-6b0e-49bf-86f5-b40e52a01f52)

### 회원가입
![image](https://github.com/user-attachments/assets/450a9a0e-be22-4a62-85d1-9399b0dc3d71)
![image](https://github.com/user-attachments/assets/40943c58-db99-4c9a-85a7-b3f2b1e8c306)

### 로그인
![image](https://github.com/user-attachments/assets/afe7f587-1eac-4baa-8c9f-f756c0860189)
![image](https://github.com/user-attachments/assets/7ef7045d-cb22-4ca6-9b1e-600dab629553)


### 게시판 리스트
![image](https://github.com/user-attachments/assets/83c8f3bf-ea3c-423d-9bc4-d6d1d368628f)
![image](https://github.com/user-attachments/assets/d9da008a-3a1c-4bf8-a220-7adbc4a7ad41)

### 게시판 등록
![image](https://github.com/user-attachments/assets/7d284378-d55a-4976-a6eb-eb1995d0630d)
![image](https://github.com/user-attachments/assets/b2c5cbfd-531e-48e0-a39b-725d9402c8f1)


### 게시판 상세 보기
![image](https://github.com/user-attachments/assets/d9fd8acb-2b98-4284-ba8d-5daa3dc9efef)
![image](https://github.com/user-attachments/assets/5b93e5a9-53f3-4fa1-be39-37f06eb23424)

### 게시판 수정 하기
![image](https://github.com/user-attachments/assets/94efd0c5-05df-4c75-ac95-63373b14c4d5)
![image](https://github.com/user-attachments/assets/47a7c209-b7db-48b0-be98-a2a9851ec005)


### 게시판 삭제하기
![image](https://github.com/user-attachments/assets/f1a8c4ce-8484-484e-b79a-2a40bbc7af21)
![image](https://github.com/user-attachments/assets/0d050e61-e1ea-4eea-bfb4-68a1366b70bc)
