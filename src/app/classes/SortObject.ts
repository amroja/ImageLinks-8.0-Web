import { SortDirection } from './SortDirection';

export class SortObject {
  constructor(
    public property: string,
    public direction: SortDirection = SortDirection.ASC
  ) {}
}
