export interface ReportUserRegisterByMonth
{
  month: number;
  total:number;
}
export interface ReportUserAccessByHour{
  hour: number;
  total:number;
}

export interface ReportMessage{
  month: number;
  total:number;
}

export interface ReportPost{
  postToday: number;
  postTotal:number;
  postThisMonth:number;
  postLastMonth:number;
}
export interface ReportUserRegister{
  userToday: number;
  userTotal:number;
  userThisMonth:number;
  userLastMonth:number;
}
export interface ReportReaction{
  reactionToday: number;
  reactionTotal:number;
  reactionThisMonth:number;
  reactionLastMonth:number;
}
export interface ReportFile{
  fileToday: number;
  fileTotal:number;
  fileThisMonth:number;
  fileLastMonth:number;
}
