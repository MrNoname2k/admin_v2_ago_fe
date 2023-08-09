import { environment } from "src/environments/environment";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {

  // AUTH MODULE

  public static LOGIN = environment.apiUrl.concat(ApiPathConfig.auth.login);


  // PAGES
  public static DASHBOARD = environment.apiUrl.concat(ApiPathConfig.page.dashboard);
  public static USERMANGER = environment.apiUrl.concat(ApiPathConfig.page.userManger);

  //UserHttp
  public static GETUSERINFO = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.getUser);
  public static UPDATEUSER = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.update);
  public static SOFTDELETE = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.softDelete);
  public static GETUSERSDELETED = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.getUserDeleted);
  public static RECOVERUSER = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.recoverUser);

  //PostHttp
  public static GETLEGALPOST = environment.apiUrl.concat(ApiPathConfig.postManagerHttp.getLegalPost);
  public static GETILLEGALPOST = environment.apiUrl.concat(ApiPathConfig.postManagerHttp.getIllegalPost);
  public static GETPOSTINFO = environment.apiUrl.concat(ApiPathConfig.postManagerHttp.getPost);
  public static SOFTDELETEPOST = environment.apiUrl.concat(ApiPathConfig.postManagerHttp.softDelete);
  public static GETPOSTDELETED = environment.apiUrl.concat(ApiPathConfig.postManagerHttp.getPostDeleted);
  public static RECOVERPOST = environment.apiUrl.concat(ApiPathConfig.postManagerHttp.recoverPost);


}
