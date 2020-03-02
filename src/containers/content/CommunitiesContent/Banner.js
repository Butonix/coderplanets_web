/*
 *
 * CommunitiesBanner
 *
 */

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { ICON_CMD } from '@config'
import { ROUTE } from '@constant'
import { buildLog } from '@utils'

import SearchBox from './SearchBox'

import {
  BannerContainer,
  IntroWraper,
  IntroTitle,
  IntroDesc,
  SlogenTextWrapper,
  CreateCommunityLink,
  SearchIcon,
} from './styles/banner'

import { searchOnChange } from './logic'

const SlogenText = dynamic({
  loader: () => import('./SlogenText'),
  // eslint-disable-next-line react/display-name
  loading: () => <SlogenTextWrapper>心爱的作品</SlogenTextWrapper>,
  ssr: false,
})
/* eslint-disable-next-line */
const log = buildLog('C:CommunitiesBanner')

const Banner = ({
  searchStatus: {
    searchValue,
    showSearchMask,
    showCreateHint,
    showSearchHint,
    showSearchResultHint,
    searchResultCount,
  },
}) => {
  return (
    <BannerContainer testid="communities-banner">
      <IntroWraper>
        <IntroTitle>
          <SearchIcon src={`${ICON_CMD}/search.svg`} />
          寻找你感兴趣的社区
        </IntroTitle>
        <SearchBox
          showSearchMask={showSearchMask}
          onChange={searchOnChange}
          value={searchValue}
          searching={false}
        />

        {showSearchResultHint && (
          <IntroDesc>
            共找到 &apos;{searchValue} &apos; 相关社区 {searchResultCount} 个
          </IntroDesc>
        )}
        {showSearchHint && (
          <IntroDesc>
            可用关键字搜索社区，比如: &apos;react&apos;, &apos;elixir&apos; 等
          </IntroDesc>
        )}

        {showCreateHint && (
          <IntroDesc>
            或者，来为你
            <SlogenText />
            <Link href={`/${ROUTE.COMMUNITIES}/new`} passHref>
              <CreateCommunityLink>建立一个新社区</CreateCommunityLink>
            </Link>
            吧！
          </IntroDesc>
        )}
      </IntroWraper>
    </BannerContainer>
  )
}

export default React.memo(Banner)
