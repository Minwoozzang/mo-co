# <img src="https://user-images.githubusercontent.com/112860405/224942152-c485de5b-6ed9-4a31-b208-a4e7b7a34ed5.png" width="25" height="30"> Hello!

 ### MOCO는 개발자 문화 중 하나인 모각코 모임을 찾고 메이트를 매칭해주는 플랫폼입니다.
 [모코 바로가기](https://mo-co.vercel.app/)

</br>

## 1. 제작 기간 & 참여 인원
- #### 2023년 02월 6일 ~ 03월 13일
- #### 프론트엔드 5명, 디자이너 1명


<br/>

## 2. 사용 기술
#### React (18.2.0) / Node (18.12.1) 

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
  - ####  비동기 통신에 특화되어 예외 처리가 쉬움
  - ####  캐싱 기능을 이용해 데이터 요청을 최소화 할 수 있음  
  
  </br>
  
   ## Recoil 
   ### 도입 배경
  - #### 컴포넌트가 세분화 되고 계층이 깊어짐에 따라 Props Drilling 발생
  - #### 어디에 어떤 상태가 정의되어 있는지 알기 어려워 유지-보수 곤란
  - #### 서버 데이터 외 전역에서 접근 가능한 상태가 필요해짐 ( 로그인 상태 추적 )
  
   ### 기술 선정 
   #### Redux
  - #### 보일러 플레이트 코드가 길어 다루기 힘듦  
  - #### 보다 더 간편한 것을 원했으며 시간 관계상 빠르게 정리할 수 있는 상태 관리 라이브러리를 찾아야 했음으로 패스함
  
   #### Recoil
  - #### 전역 상태 세팅에 필요한 코드 매우 짧음
  - #### useState와 비슷해 사용 장벽이 낮음
  
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
<summary><b>핵심 기능 설명 펼쳐보기</b></summary>
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
  - #### UID 값을 이용해 사용자를 구분하여 채팅 BOX 색깔을 다르게 나타나게 함 
  - #### Firebase의 onSnapshot 메서드를 이용해서 실시간으로 업데이트 가능 :pushpin: [문서 참조](https://firebase.google.com/docs/firestore/query-data/listen)

</br>

### 3.4 Moco 챗
<img width="250" alt="스크린샷 2023-03-14 220402" src="https://user-images.githubusercontent.com/112860405/225009708-f3a652b8-511a-406c-a329-b3d1b8fb0093.png">

</br>

- **Chat GPT 오픈 소스 이용** :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/components/mocoChat/ChatWindow.jsx#L53)
  - #### 서비스 의도에 맞게 옵션을 정해줌 (model, tokens 등)
  - #### try - catch로 해당 데이터를 받고, 에러 처리를 해줌 :pushpin: [문서 참조](https://github.com/openai/openai-node)


</div>
</details>

</br>

## 4. 트러블 슈팅 :rotating_light:

<details>
<summary><h3>유저 피드백</h3></summary>
<div markdown="1">

![Untitled (1)](https://user-images.githubusercontent.com/112860405/225014904-e249411f-bb18-401f-b591-6bc267d51477.png)
### 문제점
- #### 구체적인 반응형 UI를 고려하지 못 함
- #### 배포 된 환경에서 안되는 기능을 인지하지 못 했음

### 해결
 - #### 유저 피드백들을 모아서 노션을 이용해 팀원들과 하나씩 개선함
1. #### 화면 크기에 따라 UI 깨짐 현상을 미디어쿼리를 이용해 해결 
      - #### 처음 기획부터 모바일까지는 고려하지 못해 페이지마다 모바일까지 안되는 경우도 있지만, 태블릿까지는 되도록 작업했다.
![chrome-capture-2023-2-17](https://user-images.githubusercontent.com/112860405/225838200-d488b370-6d1f-4239-a50a-7fb075e3fbdd.gif)

2. #### 채팅시 스크롤 자동으로 내려가게 하기 :pushpin: [코드 확인](https://github.com/Minwoozzang/mo-co/blob/a3dacff65fb78eaf0440e86fecb1ec0f47eceba6/src/components/teamPage/chat/MessageBox.jsx#L20)
      - #### 처음에는 window 함수에 직접 접근해서 scroll 이벤트를 하려 했으나 구현이 쉽지 않았다.
      - #### React hook의 useRef를 이용하니 해당 위치에서 스크롤 이벤트가 되도록 쉽게 구현이 가능했다.
![chrome-capture-2023-2-17 (1)](https://user-images.githubusercontent.com/112860405/225839101-63f3b0af-c66c-46f9-a9e7-6f2730b303a4.gif)
 
```jsx
   useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
```

3. #### 모임 글이 없을 경우 화면 UI 예외 처리
     - #### 사용자의 편의를 위해 모임글이 없다는 UI를 넣어줬다.
     - #### 로그인을 안할 경우와 맞춤 정보를 등록하지 않을 경우 모임 리스트에 모자이크를 해줌으로써 사용자가 해당 서비스에 접근하도록 유도했다.
 <img width="734" alt="스크린샷 2023-03-17 172526" src="https://user-images.githubusercontent.com/112860405/225852003-29d068f3-8fb0-499f-865d-18c6c0fae03b.png">

 
4. #### 팀 모임 폭파시 해당 게시글도 삭제 :pushpin: [코드 확인](https://github.com/Minwoozzang/mo-co/blob/2e1946cf8f1fc699ad72d0b01ac1bc5bd1e955af/src/components/teamPage/TeamManage.jsx#L162)
     - #### 팀 폭파에도 불구하고 게시글이 남아있어서 다른 유저들이 해당 게시글에 댓글을 쓰거나 참여신청을 할 수 있었다.
     - #### 방장이 모임 폭파를 누를 경우 DB의 게시글까지도 같이 삭제를 해줬다.  
 
 ```jsx
   // 모임 폭파하기(방장)
  const deactivateRoom = async () => {
    const leaderCancelHandler = async (onClose) => {
      try {
        await deleteDoc(doc(db, 'teamPage', teamLocationID));
      } catch (error) {
        toast.warn('다시 시도해주세요');
      }
      await deleteDoc(doc(db, 'teamChat', teamLocationID));

      await updateDoc(doc(db, 'user', authService.currentUser.uid), {
        teamID: myInfo,
      });
      await deleteDoc(doc(db, 'post', teamPost));

      onClose();
      window.location.replace('/');
    };
 ```
 
5. #### 모임 수정시 이전 페이지로 이동 
     - #### 모임 수정 페이지를 게시글 페이지와 팀페이지에서 공용으로 사용했기 때문에 수정하기 클릭 후 navigate의 문제가 있었다.
     - #### 예) 팀 페이지 에서 모임 수정 -> 게시글 페이지로 이동 됨
     - #### useNavigate(-1)을 해줄 경우 내가 왔던 페이지로 돌아간다.
</div>
</details>

</br>

<details>
<summary><h3>북마크 더블 클릭 시 숫자증감 이상</h3></summary>
<div markdown="1">

### 문제점
- #### 북마크 클릭 연타 시 숫자증감 이상
- #### 북마크 연타 시에 내부 로직에서 발생하는 이상
 ![제목 없는 디자인 (5)](https://user-images.githubusercontent.com/112860405/225841637-fbb775a2-bb0c-4768-bc00-114a4cad393c.gif)


### 해결
 - #### debounce 함수를 만들어 더블클릭 방지 및 usecallback 의 디펜던시 배열에 bookmark 입력 :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/shared/CardSection.jsx#L22)
 - #### setTimeout과 clearTimeout을 이용해 마지막으로 처리된 이벤트 받게 함
![제목 없음 (1080 × 600px)](https://user-images.githubusercontent.com/112860405/225841802-4d72d4ad-31a6-474b-b583-85e90e099ac0.gif)

 
 
</div>
</details>

</br>

<details>
<summary><h3>이미지 용량이 클 경우 에러처리</h3></summary>
<div markdown="1">

### 문제점
 <img width="370" alt="스크린샷 2023-03-10 152542" src="https://user-images.githubusercontent.com/112860405/225030688-eefe6726-5c93-4c6a-b9c1-a666e2cf0bfd.png">

- #### 프로필 이미지의 용량이 클 경우 채팅시 속도가 느려지고 DB 용량 경고 에러 뜸
- #### 과도한 프로필 이미지 용량
    - #### 돈을 주고 DB 용량을 늘릴 수도 있었으나 팀원들과 회의하여 프로필 이미지를 줄이고자 결정했다. 
### 해결
 <img width="370" alt="스크린샷 2023-03-10 152654" src="https://user-images.githubusercontent.com/112860405/225030941-0c4d50f3-e39c-499f-aac1-4bae6dab112e.png">

 - #### 프로필 이미지 변경할 때 이미지 용량에 조건을 걸어줌 :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/components/mypage/profile/Profile.jsx#L137)
 
- #### :pushpin: [참조](https://redcow77.tistory.com/561)
 
</div>
</details>

</br>

<details>
<summary><h3>파일명 대소문자 변경</h3></summary>
<div markdown="1">

### 문제점
 <img width="700" alt="스크린샷 2023-03-14 233015" src="https://user-images.githubusercontent.com/112860405/225033547-f4466f04-f1bb-4bb2-910d-59809bb2a3b9.png">

 
- #### vercel에서 배포가 되지 않으며, 팀원들의 파일에서도 경로 에러가 발생
- #### 폴더와 파일 대소문자 변환을 깃허브가 인식하지 못함 
- #### 프로젝트 초중반에 에러를 해결하지 못 해 저장소를 옮기는 일도 있었음  
    - #### 하지만 추후에 똑같은 실수가 벌어지게 됨에 따라 팀원 모두가 저장소를 옮기는 것이 아닌 근본적인 에러를 해결하는데에 노력을 했다.
### 해결
 
 ```jsx
 git config core.ignorecase false
 ``` 
 - #### 명령어를 입력하여 대소문자를 무시하지 않도록 설정함


</div>
</details>

</br>

<details>
<summary><h3>배포 환경에서 소셜로그인 불가</h3></summary>
<div markdown="1">

### 문제점
- #### 로컬에서는 작동이 잘 되지만 배포 된 사이트에서는 소셜로그인이 안됨
- #### 대다수 유저 피드백에서 이와 관련된 문제를 제기함 

### 해결

- #### Firebase에서 배포된 도메인 주소를 등록
- #### :pushpin: [참조](https://velog.io/@renovatio_hyuns/%EC%95%B1-%EB%B0%B0%ED%8F%AC-%ED%9B%84-Google-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8%EC%9D%B4-%EC%95%88%EB%90%98%EB%8A%94-%ED%98%84%EC%83%81)

</div>
</details>

</br>

<details>
<summary><h3>헤더 토글이 다른 페이지로 넘어가도 유지 되는 문제</h3></summary>
<div markdown="1">

### 문제점
 
- #### 헤더 아이콘 클릭 후 다른 페이지 넘어가면 토글이 그대로 남아있음 (UI, UX 둘다 문제)
- #### 클릭을 해줘야만 토글이 닫힘 (state 값이 헤더에 국한되어 있어 헤더가 아닌 다른 곳을 클릭 했을 시 토글이 닫히기 원했음)
 
<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">
 
 ```jsx
 // 드랍다운
const [dropDownClick, setDropDownClick] = useState(false);
const dropDownHandler = () => {
    if (dropDownClick === false) {
      setDropDownClick(true);
    } else {
      setDropDownClick(false);
    }
  };
 ```
 </div>
</details>
 
### 해결

 - #### useState로 관리하던 토글을 헤더에 국한되는 것이 아니라 Recoil을 이용해 최상위 div에 토글 state 값을 적용시킴으로써 해결
 - #### 전역 저장소 설정 :pushpin: [코드 확인](https://github.com/nbc-moco/mo-co/blob/a94a75821dc57cdd416a34159fc5e29911a114ef/src/recoil/headerToggleState.js#L1)
 

#### 해당 컴포넌트 최상위 div에 적용

 ```jsx
import headerToggle from '../../recoil/headerToggleState';
// recoil 전역에서 가져오기
const [dropDownClick, setDropDownClick] = useRecoilState(headerToggle);

return (
  <FullScreen onClick={() => setDropDownClick(false)}>
    <HomeBanner />
    <MainBackground>
 ```

</div>
</details>

</br>
 
 <details>
<summary><h3>Recoil로 Props drilling 해결</h3></summary>
<div markdown="1">

### 문제점
 
- #### 컴포넌트마다 유저에 대한 정보를 불러옴
- #### 코드가 길어져 가독성에 좋지 않음
 ```jsx
   const getUserStackInfo = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfileUserInfo(newInfo);
    });
    return unsubscribe;
  };
 ```
### 해결
- #### 전역 저장소에서 가져옴으로써 가독성을 높힘 
```jsx 
import authState from '../../../recoil/authState';

const AddInfoModal = () => {
  const user = useRecoilValue(authState);
```
- #### Props Drilling 해소, 코드 335줄 감소
  ![Untitled](https://user-images.githubusercontent.com/112860405/224967959-e925fa86-941d-4f2e-aaef-d2c024940454.png)
- #### 전역적 로그인 상태 추적
 
</div>
</details>

## 5. 느낀점 / 회고
> **프로젝트 개발 회고 글**: https://velog.io/@kminu0819?tag=%ED%9A%8C%EA%B3%A0%EB%A1%9D
