/*
 *
 * Content
 *
 */

import React from 'react'

import { buildLog } from '@utils'

import SelectType from './SelectType'
import SetupDomain from './SetupDomain'

import { Wrapper } from '../styles/content'
import { LN } from '../logic'

/* eslint-disable-next-line */
const log = buildLog('C:NewCommunitiesContent')

const Content = ({ step, selectTypeStatus, setupDomainStatus }) => {
  const { STEP } = LN
  let stepComp

  switch (step) {
    case STEP.SELECT_TYPE: {
      stepComp = <SelectType status={selectTypeStatus} />
      break
    }
    case STEP.SETUP_DOMAIN: {
      stepComp = <SetupDomain status={setupDomainStatus} />
      break
    }
    default: {
      stepComp = <div>unknow step</div>
    }
  }

  return <Wrapper>{stepComp}</Wrapper>
}

export default Content