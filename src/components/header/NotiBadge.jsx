import { useEffect, useState } from 'react';
import {
  child,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';

const NotiBadge = () => {
  const [isRead, setIsRead] = useState([]);
  

// onvalue -> 바뀐 데이터 읽기, set -> 데이터 바꾸기(덮어쓰기)
const database = getDatabase();
const testboolean = false
const testlist = 'testlist'
const onIsRead = () => {
    set(ref(database, 'list1/uid'), testboolean)
    .then(() => console.log('success1'))
    .catch(() => console.log('error'))
}
useEffect(() => {
    
    const noitref = ref(database, '/'); // 전체 데이터 -> Object
    onValue(noitref, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setIsRead(data)
    });
    // return () => off(noitref)
  },[]);

  console.log(isRead); // isRead -> false가 되면 알림 메세지 보여주기?
  let arrData = Object.keys(isRead).map(item => isRead[item])
  console.log(arrData)

  return (
    <>
    <button onClick={onIsRead}>test</button>
    
    </>
  )
};

export default NotiBadge;
