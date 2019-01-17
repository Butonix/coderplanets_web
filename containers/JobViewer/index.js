/*
 *
 * JobViewer
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

import Comments from '../Comments'

import ArticleViewerHeader from '../ArticleViewerHeader'
import ArticleBodyHeader from '../ArticleBodyHeader'

import Maybe from '../../components/Maybe'
import MarkDownRender from '../../components/MarkDownRender'
import { ArticleContentLoading } from '../../components/LoadingEffects'

import DigestBar from './DigestBar'

import {
  BodyWrapper,
  CommentsWrapper,
  ArticleTitle,
  ArticleBody,
} from './styles'

import { makeDebugger, storePlug, THREAD } from '../../utils'

import * as logic from './logic'
/* eslint-disable-next-line */
const debug = makeDebugger('C:JobViewer')

class JobViewerContainer extends React.Component {
  componentDidMount() {
    const { jobViewer, attachment } = this.props
    logic.init(jobViewer, attachment)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { jobViewer } = this.props
    const { viewingData, loading } = jobViewer

    const company = {
      title: viewingData.company,
      logo: viewingData.companyLogo,
    }

    return (
      <React.Fragment>
        <ArticleViewerHeader
          data={viewingData}
          company={company}
          author={viewingData.author}
          thread={THREAD.JOB}
          showStar={false}
        />
        <BodyWrapper>
          <ArticleBodyHeader data={viewingData} thread={THREAD.JOB} />
          <ArticleTitle>{viewingData.title}</ArticleTitle>
          <Maybe test={!loading} loading={<ArticleContentLoading num={2} />}>
            <DigestBar data={viewingData} />
            <ArticleBody>
              <MarkDownRender body={viewingData.body} />
            </ArticleBody>
          </Maybe>
        </BodyWrapper>

        <CommentsWrapper>
          <Comments />
        </CommentsWrapper>
      </React.Fragment>
    )
  }
}

export default inject(storePlug('jobViewer'))(observer(JobViewerContainer))