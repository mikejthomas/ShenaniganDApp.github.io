import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
import styled from 'styled-components';
import { Backdrop, Section, Text, MapFruit, colors } from '../styles';
import { MilestoneContent } from '../components';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding-top: 20rem;
`;
const MilestoneMainSection = styled(Section)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  width: 100%;
  height: 100%;
  font-family: 'Electro-Shackle', sans-serif;
  justify-content: center;
`;

const MapImage = styled.img`
  width: 65%;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const WatermelonMapImage = styled(MapFruit)`
  left: 21%;
  width: 6%;
  @media (max-width: 768px) {
    left: 6%;
    width: 8%;
  }
`;

const GrapeMapImage = styled(MapFruit)`
  left: 30.5%;
  top: 10.5%;
  @media (max-width: 768px) {
    left: 20%;
    top: 12%;
  }
`;
const AppleMapImage = styled(MapFruit)`
  left: 63.5%;
  top: 31%;
  @media (max-width: 768px) {
    left: 71%;
    top: 32%;
  }
`;

const StrawberryMapImage = styled(MapFruit)`
  left: 69%;
  top: 72%;
  @media (max-width: 768px) {
    left: 80%;
  }
`;

const CherryMapImage = styled(MapFruit)`
  left: 73%;
  top: 94%;
  @media (max-width: 768px) {
    left: 84%;
  }
`;

const StyledBackdrop = styled(Backdrop)`
  font-size: 9vw;
  font-weight: 900;
  font-family: 'Electro-Shackle', sans-serif;
  width: 100%;
  /* padding: 20rem 5% 5% 10rem; */
  display: flex;
  flex-wrap: wrap;
`;

// const Divider = styled.div`
//   height: 0.2rem;

//   flex-grow: 1;
//   background: rgb(230, 255, 255);
//   background: linear-gradient(
//     90deg,
//     rgba(230, 255, 255, 0) 0%,
//     rgba(230, 255, 255, 1) 6%,
//     rgba(230, 255, 255, 1) 94%,
//     rgba(230, 255, 255, 0) 100%
//   );
// `;

function MilestoneSection(props, ref) {
  const milestoneRef = useRef();
  useImperativeHandle(ref, () => ({
    boundingTop: () => {
      return milestoneRef.current.getBoundingClientRect().top;
    }
  }));
  const isPhone = window.innerWidth <= 768;
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [startLoop, setStartLoop] = useState(false);
  const [touchedMilestone, setTouchedMilestone] = useState(false);

  const showMilestoneContent = () => {
    const watermelon = (
      <MilestoneContent
        imgSrc={require('../images/Roadmap_Pacman_01_Watermelon.png')}
        title={'Q1 2020'}
        content={'DELIVER OUR MESSAGE TO THE WORLD'}
        left={isPhone ? '18%' : '30%'}
        top={isPhone ? '-10%' : '-5%'}
      />
    );
    const grape = (
      <MilestoneContent
        imgSrc={require('../images/Roadmap_Pacman_02_Grapes.png')}
        title={'Q2 2020'}
        content={'BUIDL  BUIDL  BUIDL'}
        left={isPhone ? '30%' : '37%'}
        top={'5%'}
      />
    );
    const apple = (
      <MilestoneContent
        imgSrc={require('../images/Roadmap_Pacman_03_Apple.png')}
        title={'Q3 2020'}
        content={'OPEN SOURCE OUR CODE FOR REVIEW'}
        left={isPhone ? '4%' : '27%'}
        top={'31%'}
      />
    );
    const strawberry = (
      <MilestoneContent
        imgSrc={require('../images/Roadmap_Pacman_04_Strawberry.png')}
        title={'Q4 2020'}
        content={'GO LIVE WITH SHENANIGAN BETA'}
        left={isPhone ? '12%' : '31%'}
        top={'69%'}
      />
    );
    const cherry = (
      <MilestoneContent
        imgSrc={require('../images/Roadmap_Pacman_05_Cherries.png')}
        title={'2021'}
        content={'SHENANIGAN RELEASES ON GOOGLE PLAY AND APPLE APP STORES'}
        left={isPhone ? '17%' : '36%'}
        top={'88%'}
      />
    );
    const milestones = [watermelon, grape, apple, strawberry, cherry];
    if (startLoop && !touchedMilestone) {
      setTimeout(() => {
        if (activeMilestone == 4) {
          setActiveMilestone(0);
        } else {
          setActiveMilestone(activeMilestone + 1);
        }
      }, 3000);
    }
    return milestones[activeMilestone];
  };

  const handleMilestoneTouched = numTouched => {
    if (!touchedMilestone) {
      setTouchedMilestone(true);
    }
    setActiveMilestone(numTouched);
  };

  useScrollPosition(({ prevPos, currPos }) => {
    if (!startLoop) {
      if (currPos.y <= props.height) {
        setStartLoop(true);
      }
    }
  });

  return (
    <Wrapper ref={milestoneRef} id="roadmap">
      <StyledBackdrop>
        <Section textCentered margin={'0 0 10vw 0'}>
          <Text shadowed={colors.gold} color={colors.gold}>
            2020&nbsp;
          </Text>
          <Text shadowed={colors.deeppink} color={colors.deeppink}>
            Roadmap
          </Text>
        </Section>
        <MilestoneMainSection width={'100%'}>
          <MapImage
            src={require(isPhone
              ? '../images/Roadmap_Pacman_Map_Mobile.png'
              : '../images/Roadmap_Pacman_Map.png')}
          />
          <WatermelonMapImage
            src={require('../images/Roadmap_Pacman_01_Watermelon.png')}
            onMouseOver={() => {
              handleMilestoneTouched(0);
            }}
            onMouseLeave={() => handleMilestoneTouched(null)}
          />
          <GrapeMapImage
            src={require('../images/Roadmap_Pacman_02_Grapes.png')}
            onMouseOver={() => {
              handleMilestoneTouched(1);
            }}
            onMouseLeave={() => handleMilestoneTouched(null)}
          />
          <AppleMapImage
            src={require('../images/Roadmap_Pacman_03_Apple.png')}
            onMouseOver={() => {
              handleMilestoneTouched(2);
            }}
            onMouseLeave={() => handleMilestoneTouched(null)}
          />
          <StrawberryMapImage
            src={require('../images/Roadmap_Pacman_04_Strawberry.png')}
            onMouseOver={() => {
              handleMilestoneTouched(3);
            }}
            onMouseLeave={() => handleMilestoneTouched(null)}
          />
          <CherryMapImage
            src={require('../images/Roadmap_Pacman_05_Cherries.png')}
            onMouseEnter={() => {
              handleMilestoneTouched(4);
            }}
            onMouseLeave={() => handleMilestoneTouched(null)}
          />
          {showMilestoneContent()}
        </MilestoneMainSection>
      </StyledBackdrop>
    </Wrapper>
  );
}

export default forwardRef(MilestoneSection);
