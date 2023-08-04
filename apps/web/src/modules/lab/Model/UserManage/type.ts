type Role = '可浏览' | '可触发分析' | '可修改模型';

export interface User {
  name: string;
  image: string;
  joinTime?: string;
  roles: Role[];
  isOwner: boolean;
  confirmed: boolean;
}
