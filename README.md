### 쇼핑몰 프로젝트
### 프로젝트 구조
#### client 폴더 : react 설치
#### server 폴더 : express 웹서버

<!-- 프런트와 서버 통신 -->
리엑트 : axios 설치
- npm install axios

서버 : cors() 설치
- npm i cors

#### 리엑트 라우팅
npm i react-router-dom

### 프런트엔드 프로그래밍
상품(프런트 개발)
- 상품 등록
- 상품 삭제
- 상품 수정
- 상품 목록(검색기능)

회원
- api개발(Rest API)
    - 회원 목록(get)
    - 회원 1건(get) - id, username(로그인)
    - 회원 가입(post)
- MySQL jsuser, jsdb
    - users 테이블
        - column: id(번호),<br>
                  username(아이디),<br>
                  password(비밀번호),<br>
                  email(이메일),<br>
                  role(권한),<br>
                  created_at(가입일)

### Render 배포 환경 변수
- 백엔드 서비스의 `CLIENT_URL`에 배포한 프런트엔드의 전체 주소를 설정합니다.
- 프런트엔드 서비스의 `VITE_API_URL`에 백엔드 주소와 `/api`를 붙여 설정합니다.
  - 예: `https://<backend-service>.onrender.com/api`
- `VITE_API_URL`은 프런트엔드 빌드 시점에 반영되므로, Render 환경 변수를 추가하거나 수정한 뒤 프런트엔드를 다시 배포해야 합니다.
- `VITE_API_URL`이 없는 경우 로컬 개발에서만 `http://localhost:8000/api`를 사용합니다.