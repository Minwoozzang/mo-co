import { useEffect, useState } from 'react';
import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';

const NotiBadge = () => {
  const [isRead, setIsRead] = useState(false);
  

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
    
    const noitref = ref(database, 'list1/uid');
    onValue(noitref, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setIsRead(data)
    });
  },[]);
  console.log(isRead); // isRead -> false가 되면 알림 메세지 보여주기?

  return (
    <>
    <button onClick={onIsRead}>test</button>
    </>
  )
};

export default NotiBadge;
