type Role = '可浏览' | '可触发分析' | '可修改模型';

export interface UserItem {
  name?: string;
  email?: string;
  avatarUrl?: string;
  joinedAt?: string;
  canExecute: boolean;
  canRead: boolean;
  canUpdate: boolean;
  isOwner?: boolean;
  id: number;
}
export interface myPermisssion {
  canDestroy: Boolean;
  canExecute: Boolean;
  canRead: Boolean;
  canUpdate: Boolean;
}
