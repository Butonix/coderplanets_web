import styled from 'styled-components'

import Img from '../../Img'
import { theme } from '../../../utils'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 320px;
`
export const Body = styled.div`
  display: flex;
`
export const CommunityLogo = styled(Img)`
  width: 80px;
  height: 80px;
  display: block;
  margin-right: 15px;
`

export const CommunityInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-size: 1.2rem;
  color: ${theme('thread.articleTitle')};
  margin-bottom: 3px;
`

export const Desc = styled.div`
  font-size: 0.9rem;
  color: ${theme('thread.articleDigest')};
`

export const Divider = styled.div`
  border-bottom: 1px solid;
  border-bottom-color: ${theme('thread.articleDigest')};
  opacity: 0.4;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 10px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
`
