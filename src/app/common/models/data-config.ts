export interface BoarDataCommon {
  heading?: string;
  boardType?: string;
  itemData: ItemDataCommon;
}

export interface UserInfo {
  image?: string;
  name?: string;
  desc?: string;
  job?: string;
  addr?: string;
  hobbies?: string[];
  location?: string;
}

export class FullUserInfo{
  address ?: string;
  birthday ?: string;
  mail ?: string;
  phone?: string;
  gender?: string;
  firstName?: string;
  lastName?: string;
  linkIg?:string;
  linkFacebook?:string;
}

export interface NotifiInfo {
  name: string;
  image: string;
  active: string;
  time: string;
}

export interface PageInfo {
  name: string;
  image: string;
  pageType: string;
  isLiked: boolean;
}

export interface AdvInfo {
  image: string;
}

export interface NewInfo {
  image: string;
  title: string;
  time: string;
}

export interface ItemDataCommon {
  images?: string[];
  info?: UserInfo;
  friends?: UserInfo[];
  notifiInfo?: NotifiInfo[];
  pageInfo?: PageInfo[];
  advInfo?: AdvInfo,
  newInfo?: NewInfo[]
}

export class FriendBoard implements BoarDataCommon {
  public boardType = 'friend';
  public heading = 'Friends Zone'
  constructor(
    public itemData: ItemDataCommon
  ) {}
}

export class PageBoard implements BoarDataCommon {
  public boardType = 'page';
  public heading = 'Page You May Like'
  constructor(
    public itemData: ItemDataCommon
  ) {}
}

export class NewBoard implements BoarDataCommon {
  public boardType = 'new';
  public heading = 'Latest Top News'
  constructor(
    public itemData: ItemDataCommon
  ) {}
}

export class AdvBoard implements BoarDataCommon {
  public boardType = 'advertisement';
  public heading = 'Advertizement'
  constructor(
    public itemData: ItemDataCommon
  ) {}
}

export class notifiBoard implements BoarDataCommon {
  public boardType = 'notifi';
  public heading = 'Recent Notifications'
  constructor(
    public itemData: ItemDataCommon
  ) {}
}

export class MemoryBoard implements BoarDataCommon {
  public boardType = 'memory';
  public heading = 'Sweets Memories'
  constructor(
    public itemData: ItemDataCommon
  ) {}
}

export class InfoBoard implements BoarDataCommon {
  public boardType = 'info';
  constructor(
    public heading: string,
    public itemData: ItemDataCommon
  ) {}
}
