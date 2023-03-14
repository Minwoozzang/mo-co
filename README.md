# <img src="https://user-images.githubusercontent.com/112860405/224942152-c485de5b-6ed9-4a31-b208-a4e7b7a34ed5.png" width="25" height="30"> Hello!

 ### MOCO는 개발자 문화 중 하나인 모각코 모임을 찾고 메이트를 매칭해주는 플랫폼입니다.
 [모코 바로가기](https://mo-co.vercel.app/)

</br>

## 1. 제작 기간 & 참여 인원
- #### 2023년 02월 6일 ~ 03월 23일
- #### 프론트엔드 5명, 디자이너 1명


<br/>

## 2. 사용 기술

![](https://user-images.githubusercontent.com/112860405/224952206-a50c71a9-bb79-4bf1-9926-e0aa68c9048f.png)

</br>

### 2-1 서비스 아키텍쳐

<img width="850" src="https://user-images.githubusercontent.com/112860405/224951868-727b75ec-951a-46d3-a940-c610d6255e9e.png">

### 2.2 주요 기술 및 기술적 의사 결정 🛠️
<details>
<summary><b>주요 기술 및 기술적 의사 결정 펼쳐보기</b></summary>
<div markdown="1">
  
 ## React Query 
   ### 도입 배경
  - #### 파이어베이스 API로 서버데이터를 가져와야 함
  - #### 하지만 여러 컴포넌트에서 따로 요청하면 필요 이상으로 데이터 요청을 하게 됨
  
   ### 장정
  - ####  핵심 데이터가 서버에 있음
  - ####  비동기 통신에 특화되어 예외 처리가 쉬움
  - ####  캐싱 기능을 이용해 데이터 요청을 최소화 할 수 있음  
  
  ### 도입 결과
  - ####  해당 쿼리 키로 캐싱된 데이터를 사용해 데이터 요청 최소화
  - ####  Custom Hook으로 만든 useQuery = 코드 길이 DOWN 가독성 UP
  
  </br>
  
   ## Recoil 
   ### 도입 배경
  - #### 컴포넌트가 세분화 되고 계층이 깊어짐에 따라 Props Drilling 발생
  - #### 어디에 어떤 상태가 정의되어 있는지 알기 어려워 유지-보수 곤란
  - #### 서버 데이터 외 전역에서 접근 가능한 상태가 필요해짐 ( 로그인 상태 추적 )
  
   ### 기술 선정 
   #### Redux
  - #### 보일러 플레이트 코드가 길어 다루기 힘듦  
  - #### 보다 더 간편한 것을 원했으며 시간 관계상 빠르게 정리할 수 있는 상태 관리 라이브러리를 찾아야 했으므로 패스함
  
   #### Recoil
  - #### 전역 상태 세팅에 필요한 코드 매우 짧음
  - #### useState와 비슷해 사용 장벽이 낮음
  
  ### 도입 결과
  - #### Props Drilling 해소, 코드 335줄 감소
  ![Untitled](https://user-images.githubusercontent.com/112860405/224967959-e925fa86-941d-4f2e-aaef-d2c024940454.png)
- #### 전역적 로그인 상태 추적
  
  </br>
  
## Antd Design
### 도입 배경
- #### 프로젝트 초반에 프로젝트 기획 및 디자인 최종 결정이 미뤄짐에 따라 빠르게 UI를 구현할 수 있는 수단이 필요했음
  
  </br>
  
## Quill
### 도입 배경
- #### 사용자들이 댓글보다는 비교적 긴 텍스트를 작성할 것으로 예상했고, textarea를 사용할 때보다 텍스트 작성 경험을 좋게 만들어줄 기술이 필요했음


 </div>
</details> 

</br>

## 3. 핵심 기능
- ####  사용자 정보 맞춤 모각코 모임 추천
- ####  모각코에 집중 된 모임 전용 페이지 제공
- #### 코딩 공부에 도움이 되는 챗봇 서비스 제공 

<details>
<summary><b>핵심 기능 설명 펼치기</b></summary>
<div markdown="1">

### 3.1 모각코 모임 추천
<img width="450"  src="https://user-images.githubusercontent.com/112860405/224992808-840c3714-a119-42ef-a4c3-3d603c11c5af.png">
 </br>
<img width="510"  src="https://user-images.githubusercontent.com/112860405/224996128-6c14de32-959b-4a77-8fcb-255fc2d0d57f.png">

 </br>
 
- **유저 정보 필터링** :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/components/home/meeting/TechStackMeeting.jsx#L26)
  - #### 전체 모임리스트 중 내가 선택한 정보와 일치한 스택이 있으면 추천해줌
  - #### 내가 선택한 정보와 일치한 모임이 없을 경우와 정보를 등록하지 않았을 경우에는 예외처리 해줌 


</br>

### 3.2 팀원 수락, 강퇴
<img width="706" alt="스크린샷 2023-03-14 212904" src="https://user-images.githubusercontent.com/112860405/225001262-0c0cc70f-1511-4f3e-ad34-0e54c4e8e5ad.png">

</br>

- **팀원 멤버 정보** :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/components/teamPage/teamPageConfirm/CustomConfirmUI.jsx#L51)
  - #### 수락할 경우 해당 팀원의 isWait를 false로 바꿔 팀 멤버가 됨
  - #### 거절할 경우 해당 팀원을 제외한 다른 멤버들의 정보를 넣어줘서 해당 팀원의 정보를 DB에서 제외시킴

</br>

### 3.3 실시간 채팅
<img width="700" alt="스크린샷 2023-03-14 212538" src="https://user-images.githubusercontent.com/112860405/225000429-75b5d05b-505b-47ce-b8af-3ee15edf00c6.png">

</br>

- **채팅 정보 데이터 올리기** :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/components/teamPage/chat/MemberChatingRoom.jsx#L82)
  - #### 채팅을 하는 사용자의 정보를 DB에 올림
  - #### UID 값을 이용해 사용자를 구분하여 채팅 BOX를 다르게 나타나게 함 
  - #### Firebase의 onSnapshot 메서드를 이용해서 실시간으로 업데이트 가능 :pushpin: [문서 참조](https://firebase.google.com/docs/firestore/query-data/listen)

</br>

### 3.4 Moco 챗
<img width="250" alt="스크린샷 2023-03-14 220402" src="https://user-images.githubusercontent.com/112860405/225009708-f3a652b8-511a-406c-a329-b3d1b8fb0093.png">

</br>

- **Chat GPT 오픈 소스 이용** :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/components/mocoChat/ChatWindow.jsx#L53)
  - #### 서비스 의도에 맞게 옵션을 정해줌
  - #### try - catch로 해당 데이터를 받고, 에러 처리를 해줌 :pushpin: [문서 참조](https://github.com/openai/openai-node)


</div>
</details>

</br>

## 4. 핵심 트러블 슈팅
### 4.1 유저 피드백

</br>

## 5. 그 외 트러블 슈팅

</br>

## 6. 느낀점 / 회고
> **프로젝트 개발 회고 글**: https://velog.io/@kminu0819?tag=%ED%9A%8C%EA%B3%A0%EB%A1%9D
