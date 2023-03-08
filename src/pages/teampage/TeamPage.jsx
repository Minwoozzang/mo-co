import React, { useState } from 'react';
import styled from '@emotion/styled';
import MemberSide from '../../components/teamPage/MemberSide';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { authService, db } from '../../common/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ContentRule from './ContentRule';
import ContentBoard from './ContentBoard';
import TeamManage from '../../components/teamPage/TeamManage';
import TeamPlace from './TeamPlace';
import { onAuthStateChanged } from '@firebase/auth';
import MemberChatingRoom from '../../components/teamPage/chat/MemberChatingRoom';
import { useRecoilState } from 'recoil';
import teamPageState from '../../recoil/teamPageState';
import { useQueryClient } from 'react-query';

export default function TeamPage() {
  const teamPage = useRecoilState(teamPageState);

  const navigate = useNavigate();

  // 경로 id 받아오기
  const location = useLocation();
  const teamLocationID = location.state;

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // getTeamInformation();

        const q = query(
          collection(db, 'user'),
          where('uid', '==', authService.currentUser.uid),
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newInfo = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (!newInfo[0].teamID.filter((a) => a.includes(teamLocationID))) {
            navigate('/');
          }
        });
        return unsubscribe;
      }
    });
  }, []);

  return (
    <>
      <JustContainer>
        <WholeContainer>
          <MemberSide teamLocationID={teamLocationID} />

          <DashBoardContainer>
            {teamPage
              ?.filter((item) => item.id === teamLocationID)
              .map((item) => {
                return (
                  <DashboardHeaderWrap key={item.id}>
                    <TitleManageWrap>
                      <DashboardTitle>
                        {item.teamPartyStack.partyName}
                      </DashboardTitle>
                      <JustWrap>
                        <TeamManage
                          teamLocationID={teamLocationID}
                          item={item}
                        />
                      </JustWrap>
                    </TitleManageWrap>
                    <ProjectBasicStatus>
                      <ProjectPlace>
                        <ProjectPlaceTitlte>모임 장소</ProjectPlaceTitlte>
                        <ProjectPlaceName>
                          {item.teamPartyStack.partyLocation
                            ? item.teamPartyStack.partyLocation
                            : '비대면'}
                        </ProjectPlaceName>
                      </ProjectPlace>
                      <ProjectPlace>
                        <ProjectPlaceTitlte>모임 시간</ProjectPlaceTitlte>
                        <ProjectPlaceName>
                          {item.teamPartyStack.partyTime
                            ? item.teamPartyStack.partyTime
                            : '무관'}
                        </ProjectPlaceName>
                      </ProjectPlace>
                    </ProjectBasicStatus>
                  </DashboardHeaderWrap>
                );
              })}

            <ContentContainerR>
              <ContentContainer>
                <ContenRuleAndPlace>
                  <TeamPlace teamLocationID={teamLocationID} />
                  <ContentRule teamLocationID={teamLocationID} />
                </ContenRuleAndPlace>
              </ContentContainer>
              <ContentChatContainer>
                <ContentChat>
                  <ContentBoard teamLocationID={teamLocationID} />
                </ContentChat>
              </ContentChatContainer>
            </ContentContainerR>
          </DashBoardContainer>
          <MemberChatingRoom teamLocationID={teamLocationID} />
        </WholeContainer>
      </JustContainer>
    </>
  );
}

const TitleManageWrap = styled.div`
  display: flex;
  align-items: center;
`;

const JustWrap = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
`;

const JustContainer = styled.div`
  color: var(--body-color);
  background-position: center;
  background-size: cover;
  background-color: #3b3b3b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em 2em;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const WholeContainer = styled.div`
  margin-top: 100px;
  width: 1350px;
  height: 900px;
  display: flex;
  overflow: hidden;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 20px 50px rgb(0 0 0 / 30%);
  position: relative;
  @media screen and (max-width: 1280px) {
    max-width: 1200px;
    height: 650px;
  }
`;

const DashBoardContainer = styled.div`
  position: relative;
  padding: 50px 40px;
  color: var(--color-text, #333333);
  background-color: #f4f4f4;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DashboardHeaderWrap = styled.div`
  width: 100%;
  box-shadow: inset 0 -1px 0 0 #dde3ea;
  padding-left: 10px;
  padding-right: 16px;
`;

const DashboardTitle = styled.p`
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ProjectBasicStatus = styled.div`
  display: flex;
  height: 50px;
`;

const ProjectPlace = styled.div`
  display: flex;
  margin-right: 30px;
  align-items: center;
`;

const ProjectPlaceTitlte = styled.span`
  font-size: 18px;
  line-height: 32px;
  font-weight: 700;
  margin-right: 20px;
`;

const ProjectPlaceName = styled.span`
  position: relative;
  padding-right: 24px;
`;

const ContentContainer = styled.div`
  flex: 1;
  margin: 10px;
`;

const ContenRuleAndPlace = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainerR = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const ContentChat = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

const ContentChatContainer = styled.div`
  flex: 2;
  margin: 10px;
`;
