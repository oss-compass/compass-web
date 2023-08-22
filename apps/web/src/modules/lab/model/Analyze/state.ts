import { proxy, subscribe } from 'valtio';
import cloneDeep from 'lodash/cloneDeep';
import { isDev } from '@common/constant';

interface State {
  imagePreview: string[];
  commentDrawerOpen: boolean;
  commentActiveId: string;
  chartMeta: Record<string, { top?: number; commentCount?: number }>;
  commentMeta: Record<string, { show?: boolean; top?: number }>;
  commentVersion: {
    id: number;
    version: string;
  };
}

const initialObj = {
  imagePreview: [],
  commentDrawerOpen: false,
  commentActiveId: '',
  chartMeta: {},
  commentMeta: {},
  commentVersion: null,
};

export const pageState = proxy<State>(initialObj);

export const actions = {
  onSyncChartPosition: (id: string, top: number) => {
    if (pageState.chartMeta[id]) {
      pageState.chartMeta[id].top = top;
      return;
    }
    pageState.chartMeta[id] = { top };
  },
  onSyncCommentPosition: (id: string, top: number) => {
    if (pageState.commentMeta[id]) {
      pageState.commentMeta[id].top = top;
      return;
    }
    pageState.commentMeta[id] = { top };
  },
  onSyncCommentCount: (id: string, commentCount: number) => {
    if (pageState.chartMeta[id]) {
      pageState.chartMeta[id].commentCount = commentCount;
      return;
    }
    pageState.chartMeta[id] = { commentCount };
  },
  onCommentPanelShow: (id: string, show: boolean) => {
    if (pageState.commentMeta[id]) {
      pageState.commentMeta[id].show = show;
      return;
    }
    pageState.commentMeta[id] = { show };
  },
  onCurrentVersionChange: (v: { id: number; version: string }) => {
    pageState.commentVersion = v;
  },
  toggleCommentDrawer: (open: boolean) => {
    pageState.commentDrawerOpen = open;
  },
  activeComment: (id: string) => {
    pageState.commentActiveId = id;
  },
  reset: () => {
    const resetObj = cloneDeep(initialObj);
    Object.keys(resetObj).forEach((key) => {
      pageState[key] = resetObj[key];
    });
  },
};

// if (isDev) {
//   subscribe(pageState, () => {
//     console.log(JSON.stringify(pageState, null, 2));
//   });
// }
