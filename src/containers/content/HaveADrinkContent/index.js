/*
 *
 * HaveADrinkContent
 *
 */

import React from 'react'

import {
  connectStore,
  buildLog,
  scrollToTop,
  holdPage,
  unholdPage,
} from '@utils'
import { useShortcut } from '@hooks'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

import { Wrapper, InnerWrapper } from './styles'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:HaveADrinkContent')

const HaveADrinkContentContainer = ({ haveADrinkContent }) => {
  useInit(haveADrinkContent)

  useShortcut('space', () => {
    scrollToTop()
    holdPage()
    log('TODO:  refresh')
    setTimeout(() => unholdPage(), 1000)
  })

  return (
    <Wrapper>
      <InnerWrapper>
        <Header />
        <Body />
        <Footer />
      </InnerWrapper>
    </Wrapper>
  )
}

export default connectStore(HaveADrinkContentContainer)