import { environment } from "src/environments/environment";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {

  // AUTH MODULE

  public static LOGIN = environment.apiUrl.concat(ApiPathConfig.auth.login);


  // PAGES
  public static DASHBOARD = environment.apiUrl.concat(ApiPathConfig.page.dashboard);
  public static USERMANGER = environment.apiUrl.concat(ApiPathConfig.page.userManger);
  public static GETUSERINFO = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.getUser);
  public static UPDATEUSER = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.update);
  public static SOFTDELETE = environment.apiUrl.concat(ApiPathConfig.userManagerHttp.softDelete);

}
