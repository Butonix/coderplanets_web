/*
*
* TypeWriter
*
*/

import React from 'react'
// import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button, Message } from 'antd'

// import dynamic from 'next/dynamic'

// import ContentInput from './ContentInput'
import Editor from './Editor'
import Preview from './Preview'
import MarkDownHelper from './MarkDownHelper'
import { makeDebugger, storeSelector, getSVGIconPath } from '../../utils'
import * as logic from './logic'

import {
  Wrapper,
  Header,
  UsageText,
  MarkdownIcon,
  MarkDownHint,
  BackToEditHint,
  Footer,
  RespectText,
} from './styles'

const debug = makeDebugger('C:TypeWriter')

const PublishFooter = ({ onPublish, publishing }) => (
  <Footer>
    <RespectText>请尊重自己和他人的时间，不要发布无意义的内容。</RespectText>
    <div>
      {publishing ? (
        <Button size="default" type="primary" disabled>
          正在发布...
        </Button>
      ) : (
        <Button size="default" type="primary" onClick={onPublish}>
          发&nbsp;&nbsp;&nbsp;&nbsp;布
        </Button>
      )}
    </div>
  </Footer>
)

const View = ({
  curView,
  articleType,
  copyrightChange,
  bodyContent,
  onPublish,
  publishing,
}) => {
  // const curView = 'create' // markdown_help

  switch (curView) {
    case 'CREATE_VIEW': {
      return (
        <div>
          <Editor
            articleType={articleType}
            copyrightChange={copyrightChange}
            bodyContent={bodyContent}
            onChange={logic.editorOnChange}
            onPreview={logic.changeView.bind(this, 'PREVIEW_VIEW')}
          />
          <PublishFooter onPublish={onPublish} publishing={publishing} />
        </div>
      )
    }
    case 'PREVIEW_VIEW': {
      return (
        <div>
          <Preview
            bodyContent={bodyContent}
            onBack={logic.changeView.bind(this, 'CREATE_VIEW')}
          />
          <PublishFooter onPublish={onPublish} publishing={publishing} />
        </div>
      )
    }
    default:
      // 'MARKDOWN_HELP_VIEW'
      return <MarkDownHelper />
  }
}

const TopHeader = ({ curView }) => {
  switch (curView) {
    case 'MARKDOWN_HELP_VIEW': {
      return (
        <Header>
          <UsageText>Github Flavor Markdown</UsageText>
          <BackToEditHint onClick={logic.changeView.bind(this, 'CREATE_VIEW')}>
            <MarkdownIcon path={getSVGIconPath('original')} />
            返回编辑
          </BackToEditHint>
        </Header>
      )
    }
    default:
      return (
        <Header>
          <UsageText>发布帖子</UsageText>
          <MarkDownHint
            onClick={logic.changeView.bind(this, 'MARKDOWN_HELP_VIEW')}
          >
            <MarkdownIcon path={getSVGIconPath('markdown')} />
            markdown 语法 / emojj 速查
          </MarkDownHint>
        </Header>
      )
  }
}

// TODO: use input in old IE
class TypeWriterContainer extends React.Component {
  componentWillMount() {
    debug('mount')
    logic.init(this.props.typeWriter)
  }
  componentWillUnmount() {
    debug('TODO: store state to localstarange')
    Message.success('草稿已经保存')
  }

  render() {
    const {
      articleType,
      curView,
      bodyContent,
      publishing,
    } = this.props.typeWriter

    return (
      <Wrapper>
        <TopHeader curView={curView} />
        <View
          curView={curView}
          bodyContent={bodyContent}
          articleType={articleType}
          copyrightChange={logic.copyrightChange}
          onPublish={logic.onPublish}
          publishing={publishing}
        />
      </Wrapper>
    )
  }
}

// TypeWriterContainer.propTypes = {
// https://www.npmjs.com/package/prop-types
// closePreview: PropTypes.func.isRequired,
// }

// TypeWriterContainer.defaultProps = {}

export default inject(storeSelector('typeWriter'))(
  observer(TypeWriterContainer)
)
