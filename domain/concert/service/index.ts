import { baseService } from "../../common/service/base.service";
import { ConcertsAPI } from "../../../api/concerts";
import { BaseParamsInterface } from "../../../util/types";
import { SET_LIST_CONCERTS } from "../redux/actions";
import { ConcertsModel } from "../interface";

const concertsService = () => {
  const concertsAPI = new ConcertsAPI();
  const { dispatch, setLoading } = baseService();

  const getListConcerts = async (params: BaseParamsInterface): Promise<ConcertsModel[]> => {
    try {
      const data = await concertsAPI.GetConcertList(params);
      dispatch(SET_LIST_CONCERTS, data)
      return data;
    } catch (e) {
      throw e
    }
  }

  return {
    getListConcerts
  }
}

export default concertsService;