import R from 'ramda'

import {
  makeDebugger,
  $solver,
  asyncRes,
  asyncErr,
  dispatchEvent,
  closePreviewer,
  THREAD,
  EVENT,
  ERR,
  TYPE,
} from '../../utils'
import SR71 from '../../utils/network/sr71'

import S from './schema'

const sr71$ = new SR71({
  resv_event: [EVENT.PREVIEW_CLOSED, EVENT.REFRESH_REACTIONS],
})

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:PostViewer')
/* eslint-enable no-unused-vars */

let sub$ = null
let store = null

export function onReaction(thread, action, userDid, { id }) {
  /* debug('onReaction thread: ', thread) */
  if (action === TYPE.FAVORITE) {
    // call favoriteSetter
    return dispatchEvent(EVENT.SET_FAVORITE_CONTENT, {
      data: { thread },
    })
  }
  // debug('onReaction userDid: ', store.isLogin)
  /* debug('onReaction id: ', id) */

  const args = { id, thread: R.toUpper(thread), action }

  return userDid
    ? sr71$.mutate(S.undoReaction, args)
    : sr71$.mutate(S.reaction, args)
}

export const onListReactionUsers = (type, data) =>
  dispatchEvent(EVENT.USER_LISTER_OPEN, { type, data })

export const onTagSelect = tagId => {
  const { id } = store.viewingData
  const communityId = store.curCommunity.id
  const thread = R.toUpper(store.activeThread)

  sr71$.mutate(S.setTag, { thread, id, tagId, communityId })
}

export const onTagUnselect = tagId => {
  const { id } = store.viewingData
  const communityId = store.curCommunity.id
  const thread = R.toUpper(store.activeThread)

  sr71$.mutate(S.unsetTag, { thread, id, tagId, communityId })
}

export const onCommentCreate = () => {
  const { id } = store.viewingData
  if (store.activeThread === THREAD.POST) {
    return sr71$.query(S.postComment, { id })
  }
}

const loadPost = ({ id }) => {
  const userHasLogin = store.isLogin
  const variables = { id, userHasLogin }
  markLoading()
  sr71$.query(S.post, variables)
}

const openAttachment = att => {
  if (!att) return false

  const { type } = att

  if (type === TYPE.PREVIEW_POST_VIEW) {
    loadPost(att)

    store.markState({ type })
    store.setViewing({ post: att })
  }
}

const markLoading = (maybe = true) => store.markState({ loading: maybe })
// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('post'),
    action: ({ post }) => {
      store.setViewing({ post: R.merge(store.viewingData, post) })
      store.syncViewingItem(post)
      markLoading(false)
    },
  },
  {
    match: asyncRes(EVENT.REFRESH_REACTIONS),
    action: e => {
      const { id } = e[EVENT.REFRESH_REACTIONS].data
      return sr71$.query(S.postReactionRes, { id })
    },
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSED),
    action: () => {
      sr71$.stop()
      markLoading(false)
      // store.setViewing({ post: {} })
    },
  },
  {
    match: asyncRes('reaction'),
    action: ({ reaction: { id } }) => sr71$.query(S.postReactionRes, { id }),
  },
  {
    match: asyncRes('undoReaction'),
    action: ({ undoReaction: { id } }) =>
      sr71$.query(S.postReactionRes, { id }),
  },
  {
    match: asyncRes('setTag'),
    action: () => {
      loadPost(store.viewingData)
      closePreviewer()
    },
  },
  {
    match: asyncRes('unsetTag'),
    action: () => {
      loadPost(store.viewingData)
      closePreviewer()
    },
  },
]
const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      debug('ERR.CRAPHQL -->', details)
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
    },
  },
]

export function init(_store, attachment) {
  store = _store

  if (sub$) return false
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
  openAttachment(attachment)
}

export function uninit() {
  if (store.loading || !sub$) return false

  debug('===== do uninit')
  sub$.unsubscribe()
  sub$ = null
}
