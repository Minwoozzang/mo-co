import React from 'react';
import styled from '@emotion/styled';
import { TwitterShareButton } from 'react-share';
import { BsTwitter } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { IoCloseOutline } from 'react-icons/io5';

export default function SocialShare({ onClose }) {
  const currentUrl = window.location.href;

  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '모여서 각자 코딩해요 MOCO 👩‍💻',
        description: 'MOCO 에서 마음💗이 맞는 팀원👬을 만나 모각코💻 해보세요!',
        imageUrl:
          'https://lh3.googleusercontent.com/fife/AMPSemffUbnkxtp2YjpvuaAeQ6mDNH7DKN0VSIyoBGKYJDgFhI7cNTthdr5jdJQiTN7ateApNXr3uL-RjpfoTBV74OYTUsxoqx2S8F3nT-1mwSWAqNhvSYm2AIg1pMUSTw8t5MuWwqc8YfAdOYlCFkBJfdjqDh_dd5dGLoyx4mj30XMMM_iNsdRasMk8rEToTcO0B0lFvgSSKCs7wC8u-d-vFB37gXl_k7UGRObU2Hrfwop36JEcZqBQxAblWvKcogc9uJeFi0-DRUsCWKSjWThgKOFr-c_9v57_TsfuPm4zQed0YnmDKQ-ji6ltsSMf0CkAHH3cY4osTWiLoyxUiEq7BTxCe9NhG2vjLBBDOCKefNXfSbyFQwpHoZ-a4oGzrdvNHGYe04MKiYBq-nlQWz13NXN3F9HKh9ttlmPig6v76e-tC-WUZG_PPeLROdnba2CYaRPjMLO-ibtqFyUEeGPdWMyIYObzFHemKBn77saTYsKLBlAN5q2GDPqJy8w1K8yrngfJehgKoLbZI4aXHBmEB-mx_Aqg9pWt0k7Lf00eUGad9Q_84Xhfm2KI6EnJKbPcpR9CUM3HoAgqBeZqRUkwT64i9CjWiXwR0mgUBbduCQhLlywB5mnaZDY0olo1OS9zJHpOJlWLO6awMXjoO8xpLX0ZMk44IlCNFMsjLRu08yEific9tEF8de2k6MCDNrpBa9H0ZAXGdRSO5k6kXTmZWzhN-WS15GiB1eoKuWOYz-IeLTFnM6O6Pogc2060JuChOZQni7PzapWlfVirEiDNxKIic-X2t3CSxWrsjwZZxioHPjhu-A5RIQW4pY0Aqs4eG22HkouOas8euhp1xZZtvJ6_KKAK1DzeDjF3F_E-_ehCirSpj80BgRwRk256qaNdwbkucDOS63Xkqr5XQdF8FsvY6RhP_HySSWthnCyobmXZgQgAyaXu6IYOaCHqNKSRMOzd_UNiqgytP6wdGen8ocMr9pb6LqMly0oIchuPoxmvOhB8Q4SQIhD3dKbn-ovFpt1Med7DfsL8NI2jWgIdKYMvYqyqpB_kXp7rXbK77EPuFfK1JZKYEi0kRbbCcdscsa_Ijmpu5MQTNqTTAD8Fc7qcKphcAHEE7Gj--jwsHevfI1KWu0t0lRlyQxfr0XZrSrbg7v__ThtREPkJFwaWYB-eascp7ezV7XAyEjlfIQiwseFyYWJ1mU-8DSrf0HbjKFjGdJRfA_ov-vARZ92XVtD5OJYyZgiajASO58wYyzVK9JKD0WpAUatjpxqJEGK1VaYNyL-PxXjxEtwaL0HbafBI7t3-oqzZWqNlP0L7ZYuaNezJ06_W7wSkC5Bb6K99nYdgx8XqXKGK73SyiFblWz2liW2EZNT2oR4cl5pqNet4NMNZEy1tD77AISmj1R7St1S9Jg74BdiuuTjYsIc5vMx1BmEz9Ud7LVHxHFvoQylkNqwmDzB-nkhYDanCHS9N0yirr9L_pWT0djn6eDspD4KFHMH0-jrlDh7yA82hC_sb2yn1uYviC4Q=w2940-h1522',
        link: {
          mobileWebUrl: 'https://mo-co.vercel.app/',
          webUrl: 'https://mo-co.vercel.app/',
        },
      },
    });
  };

  return (
    <>
      <DropdownOption>
        <ShareTitle>공유</ShareTitle>
        <IoCloseOutline
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 25,
            right: 20,
            fontSize: 40,
            color: '#E7E7E7',
            cursor: 'pointer',
          }}
        />
        <KakaoShareButton onClick={shareKakao}>
          <WrappingOne>
            <KakaoShare />
            <SharePh>카카오톡으로 공유하기</SharePh>
          </WrappingOne>
        </KakaoShareButton>
        <TwitterShareButton url={currentUrl}>
          <WrappingTwo>
            <TwitterShare />
            <SharePhTwo>트위터로 공유하기</SharePhTwo>
          </WrappingTwo>
        </TwitterShareButton>
      </DropdownOption>
    </>
  );
}

const ShareTitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 35px;
`;

const DropdownOption = styled.div`
  position: absolute;
  z-index: 1; /*다른 요소들보다 앞에 배치*/
  font-weight: 400;
  background-color: #232323;
  width: 400px;
  height: 230px;
  border-radius: 20px;
  padding: 15px;
  top: 25%;
  right: 40%;
  padding: 35px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const WrappingOne = styled.div`
  align-items: center;
  display: flex;
  width: 330px;
  height: 45px;
  background-color: #ffe600;
  margin-bottom: 15px;
  border-radius: 5px;
  text-align: center;
  justify-content: center;
`;

const WrappingTwo = styled.div`
  align-items: center;
  display: flex;
  width: 330px;
  height: 45px;
  background-color: #27a8e0;
  border-radius: 5px;
  text-align: center;
  justify-content: center;
`;

const TwitterShare = styled(BsTwitter)`
  margin-right: 10px;
  size: 15px;
  color: white;
`;

const KakaoShare = styled(RiKakaoTalkFill)`
  margin-right: 5px;
  size: 15px;
  color: #381e1e;
  font-size: 21px;
`;

const SharePh = styled.div`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

const SharePhTwo = styled.div`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  color: white;
`;

const KakaoShareButton = styled.button`
  all: unset;
`;
