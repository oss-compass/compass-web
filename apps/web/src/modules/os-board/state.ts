import { proxy, subscribe } from 'valtio';
import type {
  OsBoardAlertRule,
  OsBoardDerivedMetric,
  OsBoardStateSnapshot,
  OsBoardSubscription,
} from './types';

const STORAGE_KEY = 'os-board:v2';

const createEmptyState = (): OsBoardStateSnapshot => ({
  dashboards: [],
  metrics: [],
  derivedMetrics: [],
  alertRules: [],
  alertEvents: [],
  subscriptions: [],
});

export const osBoardState = proxy<OsBoardStateSnapshot>(createEmptyState());

const uid = (prefix: string) =>
  `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now()}`;

export const serializeSnapshot = (): OsBoardStateSnapshot => {
  return JSON.parse(JSON.stringify(osBoardState));
};

export const hydrateSnapshot = (snapshot: OsBoardStateSnapshot) => {
  osBoardState.dashboards = snapshot.dashboards;
  osBoardState.metrics = snapshot.metrics;
  osBoardState.derivedMetrics = snapshot.derivedMetrics;
  osBoardState.alertRules = snapshot.alertRules;
  osBoardState.alertEvents = snapshot.alertEvents;
  osBoardState.subscriptions = snapshot.subscriptions;
};

export const loadFromStorage = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const snapshot = JSON.parse(raw) as OsBoardStateSnapshot;
    hydrateSnapshot(snapshot);
    return true;
  } catch {
    return false;
  }
};

export const saveToStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(serializeSnapshot())
    );
  } catch {
    return;
  }
};

export const actions = {
  upsertAlertRule: (rule: Omit<OsBoardAlertRule, 'id'> & { id?: string }) => {
    if (rule.id) {
      const existing = osBoardState.alertRules.find((r) => r.id === rule.id);
      if (!existing) return;
      Object.assign(existing, rule);
      return;
    }
    osBoardState.alertRules.unshift({
      ...rule,
      id: uid('ar'),
    } as OsBoardAlertRule);
  },

  removeAlertRule: (id: string) => {
    osBoardState.alertRules = osBoardState.alertRules.filter(
      (r) => r.id !== id
    );
  },

  addDerivedMetric: (input: Omit<OsBoardDerivedMetric, 'id'>) => {
    osBoardState.derivedMetrics.unshift({ ...input, id: uid('dm') });
  },

  updateDerivedMetric: (id: string, patch: Partial<OsBoardDerivedMetric>) => {
    const m = osBoardState.derivedMetrics.find((x) => x.id === id);
    if (!m) return;
    Object.assign(m, patch);
  },

  removeDerivedMetric: (id: string) => {
    osBoardState.derivedMetrics = osBoardState.derivedMetrics.filter(
      (m) => m.id !== id
    );
  },

  upsertSubscription: (
    sub: Omit<OsBoardSubscription, 'id'> & { id?: string }
  ) => {
    if (sub.id) {
      const existing = osBoardState.subscriptions.find((s) => s.id === sub.id);
      if (!existing) return;
      Object.assign(existing, sub);
      return;
    }
    osBoardState.subscriptions.unshift({ ...(sub as any), id: uid('sub') });
  },
};

let saveTimer: number | NodeJS.Timeout | null = null;
subscribe(osBoardState, () => {
  if (typeof window === 'undefined') return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveToStorage();
  }, 200);
});
