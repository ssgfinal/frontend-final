# [HOUS-SG] 선결제로 노쇼 예방을 하는 숙박앱 


## 👉🏻 프로젝트 소개

- 신세계 KDT 과정에서 진행한 선결제로 예약 및 노쇼를 방지하는 시스템을 구현하는 프로젝트입니다.
- 이때 숙박을 주제로 하여 고객, 점주, 관리자 입장에서 숙박 시스템을 구현하는 것이 목표입니다.

## 🗓 프로젝트 기간
2023년 08월 25일 ~ 2023년 10월 27일 (9주)

## 👉🏻 서비스 소개 <br>
- 일반 유저의 경우 무한 스크롤로 이루어진 검색창을 통하여서 숙소를 카테고리를 설정 후 검색할 수 있습니다. 이때 최신 및 평점 순으로 정렬 가능합니다
- 숙소에 대해서 찜하기 기능을 이용할 수 있고, 달력을 통해 예약일을 설정 후 쿠폰 및 포인트를 적용시켜 예약할 수 있습니다.
- 예약내역에 대해서는 리뷰를 남길 수 있으며, 예약시 그리고 숙소 방문 전날 문자를 받습니다.
- 사업자의 경우에는 OCR로 사업자 검증 후, 다음 우편번호 서비스오 카카오 지도를 바탕으로 숙소 위치 등록, 이후 이미지 등록와 숙소 정보 등록을 통해 숙소 등록이 가능합니다.
- 달력을 통해 예약내역을 확인 및 예약 취소 + 오프라인 예약을 할 수 있습니다.
- 차트를 동해서 숙소별 매출액을 확인할 수 있습니다.
- 관리자는 리뷰 신고 관리, 숙소 등록 및 삭제 관리, 쿠폰 발행을 할 수 있습니다. 

👉🏻[HOUS-SG 팀 노션  Click!](https://www.notion.so/HOUS-SG-Project-68a8b031b7ee4be5aad70516b1214c74)
👉🏻[BACKEND-GITHUB  Click!](https://github.com/ssgfinal/backend-final)

## 🛠 프로젝트 아키텍쳐
![image](https://github.com/ssgfinal/frontend-final/assets/120103909/709638dc-798b-4358-9ab9-5441fcfa2333)


## ⚙ 기술 스택

### ✔ Frond-end
<div>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=black">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=black">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white">



</div>

### ✔ Dev tools
<div>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/KakaoTalk-FFCD00?style=for-the-badge&logo=KakaoTalk&logoColor=black"/>
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=black"/>

</div>

<br><br>

## 📝 기술 스택 & 라이브러리 사용 이유

| 기술 스택 | 사용이유 |
| --- | --- |
| JWT | Stateless 하여 로드밸런싱에 이점이 있다. |
| docker | 어느 환경에서든 동일한 조건으로 배포가 가능하다. |
| react | SPA 기반으로 페이지 이동시 깜빡임이 없고, 유저와 상호작용이 많은 숙박앱에서 CSR을 통해 효과적인 랜더링을 할 수 있다.|
| axios | promise 기반으로 데이터 처리의 용이, json 데이터 변환을 통한 코드 최적화할 수 있다. axiosinstance를 바탕으로 코드 재사용성과 유지보수성을 향상시킬 수 있다. |
| gitaction | docker와 함께 CICD 파이프라인을 형성하여 main에 병합시 자동으로 배포를 해준다. |
| VITE | CRA보다 빠른 빌드를 위해 사용했다. |
| NGINX | EC2 인스턴스에 사용할 웹서버로 사용했다. 정적웹서버에 적합하다.|
| typescript | 코드 에러 핸들링에 용이함, 자동 완성 기능 활용에 용이, 타입 체크를 통해 협업에 용이하다. |
| UI라이브러리 | antd, swiper, full-calendar 를 생산성 향상을 위해서 사용했다. |
| styled-component | css-js 로 css를 자바스크립트로 동적 스타일링하기 용이하고, 코드 가독성을 향상 시킬 수 있다.|
| react-query | 캐싱을 통하여서 불필요한 api 요청 최적화 가능하다. 무한스크롤 구현에 용이하다.|
| redux-toolkit| 캐싱이 필요없는 전역변수의 상태관리에 사용했다. |

👉🏻[라이브러리 채택 기준](https://www.notion.so/5b8e07ea6cfc436893f75afdc0615bce)

  
## Frontend Git-flow 전략
main : 제품으로 출시될 수 있는 브랜치 

develop : 다음 출시 버전을 개발하는 브랜치

feature : 기능을 개발하는 브랜치

hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치


#### 규칙

- main 브랜치는 최소한의 병합으로 진행

- 작업을 시작하기 전에 이슈를 생성한다.

- 출시 전까지는 main 브랜치를 develop 브랜치처럼 사용한다.

- 각자 로컬 개발환경에서 기능별 feature 브랜치 작성 후 작업 feature 브랜치 → develop 브랜치 로 Pull-Request 병합을 요청한다.

- Pull-Request는 1명 이상의 팀원이 승인시에만 merge 가능하다.

- feature 브랜치명은 이슈 번호로 작성

- 배포 후에는  develop 브랜치를  main 브랜치와 merge한 이후 베포, 버그나 이슈가 발생되었을 때에는 hotfix 브랜치로 수정작업을 진행한 후, main 브랜치에 병합한다.

- 업데이트 작업이 완료되면 최후에 main 브랜치에 병합한다.

- 커밋 메시지는 gitmoji 를 활용   https://gitmoji.dev/

  
## 👷 ERD
![image](https://github.com/ssgfinal/frontend-final/assets/120103909/1343b574-30ef-4a5e-bdc0-3a0117e8747e)


## 🔆 트러블슈팅
![image](https://github.com/ssgfinal/frontend-final/assets/120103909/a118e41b-f583-4775-ab6e-47793f17f744)
![image](https://github.com/ssgfinal/frontend-final/assets/120103909/a112a716-404d-4b6e-b6c3-50011730b044)
![image](https://github.com/ssgfinal/frontend-final/assets/120103909/2da266b2-9ad3-4281-b17b-bbc88af4c936)
![image](https://github.com/ssgfinal/frontend-final/assets/120103909/6c8b7794-e96e-4572-be75-bf65214d1910)
![image](https://github.com/ssgfinal/frontend-final/assets/120103909/37257e78-864a-4e0b-8a70-efc4edc7375b)

## 🔆 자체 피드백

![image](https://github.com/ssgfinal/frontend-final/assets/120103909/9ca40bd7-1d58-451a-90a7-912e848612e5)







## 👻 HOUS-SG 팀원들!
  
  <table>
  <tr>
  <td colspan='3' align="center">
  Backend
  </td>
  <tr>
        </td>
    <td align="center" >
    <b>김수홍(팀장)</b></a><br>
    <a href="https://github.com/suhong99">Github</a>
    <br><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><br>
    </td>
        </td>
    <td align="center" >
    <b>우지예</b></a><br>
    <a href="https://github.com/woojiyee">Github</a>
    <br><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><br>
    </td>
        </td>
    <td align="center" >
    <b>한주리</b></a><br>
    <a href="https://github.com/HanJuRi999">Github</a>
    <br><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><br>
    </td>
    </tr>
</table>

<br>

  <table>
  <tr>
  <td colspan='2' align="center">
  Frontend
  </td>
  <tr>
        </td>
    <td align="center" >
    <b>김보근</b></a><br>
    <a href="https://github.com/SanBu599">Github</a>
    <br><img src="https://img.shields.io/badge/springboot-6DB33F?style=flat&logo=springboot&logoColor=white"/><br>
    </td>
        </td>
    <td align="center" >
    <b>최영석</b></a><br>
    <a href="https://github.com/0-ssg">Github</a>
    <br><img src="https://img.shields.io/badge/springboot-6DB33F?style=flat&logo=springboot&logoColor=white"/><br>
    </td>
  </tr>
</table>

<br>
