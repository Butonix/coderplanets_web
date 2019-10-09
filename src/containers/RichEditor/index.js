/*
 *
 * RichEditor
 *
 */

import React from 'react'
// import Editor from '@stfy/react-editor.js'
import Editor from '@groupher/react-editor'

import { connectStore, buildLog } from '@utils'
import { useScript } from '@hooks'

import { useInit } from './logic'
// import * as logic from './logic'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('C:RichEditor')

const RichEditorContainer = ({ richEditor }) => {
  const [uploaderLoaded] = useScript(
    'https://gosspublic.alicdn.com/aliyun-oss-sdk-5.2.0.min.js'
  )

  useInit(richEditor, uploaderLoaded)

  return (
    <Wrapper>
      <div id="codex-editor" />
      <div id="editorjs-container" />
      <Editor holder="editorjs-container" />
    </Wrapper>
  )
}

export default connectStore(RichEditorContainer)