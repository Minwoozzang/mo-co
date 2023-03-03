import { useEffect, useState } from 'react';
import {
  child,
  // getDatabase,
  off,
  onValue,
  push,
  query,
  ref,
  set,
  update,
} from 'firebase/database';
import { db, realtime } from '../../common/firebase';
import { collection, onSnapshot } from 'firebase/firestore';


const NotiBadge = () => {
  const [isRead, setIsRead] = useState([]);
  const [status, setStatus] = useState(true);
  const [teamPage, setTeamPage] = useState([]);

// 필요한 데이터 : 팀페이지, 유저 불러와서 push /teamID
  

// onvalue -> 바뀐 데이터 읽기, set -> 데이터 바꾸기(덮어쓰기)
const database = realtime;
const testboolean = false

const onIsRead = () => { 
    set(ref(database, 'list1/isWait'), true)
    .then(() => console.log('success1'))
    .catch(() => console.log('error'))
}
const updateData = () => { 
  update(ref(database, 'list1'), { // 중괄호 필요
    isWait: testboolean
  })
}
// useEffect(() => {
//     const teamPageCollectionRef = collection(db, 'teamPage');
//     const q = query(teamPageCollectionRef);
//     const getTeamPage = onSnapshot(q, (snapshot) => {
//       const teamPageData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTeamPage(teamPageData);
//     });
//     return getTeamPage;
//   }, []);

useEffect(() => {
    
    const noitref = ref(database, '/'); // 전체 데이터 -> Object
    onValue(noitref, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      setIsRead(data)
    });
    return () => off(noitref)
  },[]);

  // console.log('팀페이지 데이터', teamPage)

  // console.log(isRead); // isRead -> false가 되면 알림 메세지 보여주기?
  let arrData = Object.keys(isRead).map(item => isRead[item]) // 객체에서 배열로 바꿔줌
  // console.log(arrData)

  return (
    <>
    <button onClick={onIsRead}>test</button>
    <button onClick={updateData}>test2</button>
    {arrData.map((item, idx) => (
      <div key={idx}>알림메세지{idx+1}</div>
    ))}
    </>
  )
};

export default NotiBadge;
