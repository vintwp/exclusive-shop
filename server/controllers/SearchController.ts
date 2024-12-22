import { IRequest, IResponse, TSearch } from "../types";
import { SearchService } from "../service";

class SearchController {
  async search(
    req: IRequest<any>,
    res: IResponse<{ data: TSearch[] }>,
  ) {
    const query = req.query.query as string;
    
    console.log(query);

    const searchResult = await SearchService.getSeach(query);

    console.log(searchResult);

    const preparedResultData = searchResult.map(item => {
      const { id, name, url } = item.item;
      return {
        id,
        name,
        url,
      }
    })

    setTimeout(() => {
      return res.json({
        data: preparedResultData,
      });
    }, 5000)

    // return res.json({
    //   data: preparedResultData,
    // });
  }
}

const searchController = new SearchController();

export default searchController;