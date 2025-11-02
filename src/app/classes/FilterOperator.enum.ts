export enum FilterOperator {
  eq = 'eq',
  neq = 'neq',
  isnull = 'isnull',
  isnotnull = 'isnotnull',
  lt = 'lt',
  lte = 'lte',
  gt = 'gt',
  gte = 'gte',
  //the following are only for strings
  startswith = 'startswith',
  endswith = 'endswith',
  contains = 'contains',
  doesnotcontain = 'doesnotcontain',
  isempty = 'isempty',
  isnotempty = 'isnotempty',
  //used for lists only
  in = 'in',
  notin = 'notin',
}
