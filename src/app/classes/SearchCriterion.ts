import { FilterOperator } from './FilterOperator.enum';
import { JunctionOperator } from './JunctionOperator.enum';

export class SearchCriterion {
  constructor(
    public field: string,
    public value: any,
    public operator: FilterOperator,
    public junctionOperator: JunctionOperator = JunctionOperator.And,
    public isCaseSensitive: boolean = false,
    public connectionString?: string
  ) {}
}
