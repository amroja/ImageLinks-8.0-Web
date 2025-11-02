import { Config } from './Config';
import { SearchCriterion } from './SearchCriterion';
import { SortObject } from './SortObject';

export class FilterablePageRequest {
  pageNumber: number = 0;
  pageSize: number = Config.PAGE_SIZE_OPTIONS[0];
  filters: Array<SearchCriterion> = [];
  sortList: Array<SortObject> = [];
  searchValue: any;
}
