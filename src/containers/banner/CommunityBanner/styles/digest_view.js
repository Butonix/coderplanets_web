import styled from 'styled-components'

import { theme, cs } from '@utils'

import Img from '@Img'
import CommunityFaceLogo from '@components/CommunityFaceLogo'

import { BaseBanner, BaseTabber } from './index'

export const Wrapper = styled(BaseBanner)`
  min-height: 150px;
`
export const InnerWrapper = styled.div`
  ${cs.flex('justify-center')};
  width: 100%;
  max-width: ${cs.MAX_CONTENT_WIDTH};
`
export const BaseBannerContent = styled.div`
  ${cs.flex('align-center')};
  width: 100%;
  padding: 0 6vw;

  margin-top: -35px;

  ${cs.media.mobile`
    margin-left: 0;
    margin-right: 3%;
    padding-left: 3%;
    padding-right: 3%;
  `};
`

export const BannerContentWrapper = styled(BaseBannerContent)``

export const BannerContainer = styled(BaseBanner)`
  min-height: 125px;
`
export const TabberWrapper = styled(BaseTabber)``

export const CommunityWrapper = styled.div`
  ${cs.flexGrow('align-center')};
  ${cs.media.mobile`
    margin-left: 5%;
`};
`

export const LogoWrapper = styled.div`
  position: relative;
  width: 55px;
  margin-right: 5px;
  margin-top: ${({ raw }) => (raw === 'home' ? '-14px' : 0)};
  @media (max-height: 800px) {
    margin-top: ${({ raw }) => (raw === 'home' ? '-8px' : 0)};
  }
`
export const CommunityLogo = styled(CommunityFaceLogo)`
  width: 55px;
  height: 55px;
  border-radius: 5px;
`
export const CommunityInfo = styled.div`
  ${cs.flexColumn('justify-center')};

  margin-top: -6px;
  margin-left: 1em;
`
export const TitleWrapper = styled.div`
  ${cs.flex('align-center')};
`
export const Title = styled.div`
  ${cs.flex('align-baseline')};
  font-size: 18px;
  color: ${theme('banner.title')};
`
export const VerifiedWrapper = styled.div`
  ${cs.flex('align-center')};
  margin-left: 14px;
`
export const VerifiedIcon = styled(Img)`
  border-radius: 50%;
  padding: 0;
  margin-right: 4px;
  display: block;
  fill: ${theme('baseColor.green')};
  width: 10px;
  height: 10px;
`
export const VerifiedText = styled.div`
  color: ${theme('baseColor.green')};
  font-size: 10px;
`
export const GroupsIcon = styled(Img)`
  fill: ${theme('banner.desc')};
  margin-left: 8px;
  width: 18px;
  height: 18px;
  margin-top: 5px;
  opacity: 0;
  &:hover {
    cursor: pointer;
    fill: ${theme('banner.title')};
  }
  ${BannerContainer}:hover & {
    fill: ${theme('banner.title')};
    opacity: 1;
  }
  transition: opacity 0.2s;
`
export const Desc = styled.div`
  font-size: 1rem;
  color: ${theme('banner.desc')};
  margin-top: -2px;
  @media (max-height: 800px) {
    font-size: 1rem;
  }
  ${cs.truncate('500px')};

  ${cs.media.tablet`
    ${cs.truncate('220px')};
  `};

  ${cs.media.mobile`
    ${cs.truncate('180px')};
  `};
`
export const LogoHolder = styled(Img)`
  fill: ${theme('banner.desc')};
  width: 50px;
  height: 50px;
  @media (max-height: 800px) {
    width: 40px;
    height: 40px;
  }
  opacity: 0.6;
  margin-top: 3px;
`
