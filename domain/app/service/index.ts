import { BaseService, baseService } from "../../common/service/base.service";

class AppService extends BaseService {
  public initApp() {
    this.setLoading('LOADING', true);
  }
}


export default AppService;