import { baseService } from "../../common/service/base.service";
import { ConcertsAPI } from "../../../api/concerts";
import { BaseParamsInterface, Dict } from "../../../util/types";
import { SET_LIST_CONCERTS, UPDATE_TICKET_COUNT } from "../redux/actions";
import { ConcertsModel } from "../interface";

const concertsService = () => {
  const concertsAPI = new ConcertsAPI();
  const { dispatch, setLoading } = baseService();

  const getListConcerts = async (params: BaseParamsInterface): Promise<ConcertsModel[]> => {
    try {
      const data = await concertsAPI.GetConcertList(params);

      const obj: Dict<ConcertsModel> = data.reduce((list, concert) => {
        list[concert.concertId] = concert
        return list
      }, {})
      dispatch(SET_LIST_CONCERTS, obj)
      return data;
    } catch (e) {
      throw e
    }
  }

  const updateCountTicket = (id: number, count: number) => {
    let tempCount = count < 0 ? 0 : count
    dispatch(UPDATE_TICKET_COUNT, { id, tempCount })
  }

  return {
    getListConcerts,
    updateCountTicket
  }
}

export default concertsService;