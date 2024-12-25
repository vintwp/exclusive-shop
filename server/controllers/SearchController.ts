import { IRequest, IResponse, TSearch } from "../types";
import { SearchService } from "../service";

class SearchController {
  async search(
    req: IRequest<any>,
    res: IResponse<{ data: TSearch[] }>,
  ) {
    const query = req.query.query as string;
    
    const searchResult = await SearchService.getSeach(query);

    const preparedResultData = searchResult.map(item => {
      const { id, name, url } = item.item;
      return {
        id,
        name,
        url,
      }
    })

    return res.json({
      data: preparedResultData,
    });
  }
}

const searchController = new SearchController();

export default searchController;