import pa from 'package.json';
export const Config = {
  VERSION: pa.version,
  APPLICATION_ADMIN_RID: 0,
  BACK_END_URL: '2ddmYsHzpMgFtFXvcJR1W8MruKi0AmVQ6geBEJyZVRY=',
  USE_PROXY: false,
  DATE_LOCALE: 'ar-JO',
  DATE_FORMATS: {
    DATE: 'dd/MM/yyyy',
    DATE_TIME: 'dd/MM/yyyy HH:mm',
    TIME: 'hh:mm a',
    FULL_DATE: 'EEEE, dd/MM/yyyy',
  },
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  NUM_PATTERN: new RegExp('^[0-9]*$'),
  Logo_Name: null,
  sites: [
    { value: 1, viewValue: 'site1' },
    { value: 2, viewValue: 'site2' },
    { value: 3, viewValue: 'site3' },
    { value: 4, viewValue: 'site4' },
    { value: 5, viewValue: 'site5' },
    { value: 6, viewValue: 'site6' },
    { value: 7, viewValue: 'site7' },
    { value: 8, viewValue: 'site8' },
    { value: 9, viewValue: 'site9' },
    { value: 10, viewValue: 'site10' },
  ],
};
