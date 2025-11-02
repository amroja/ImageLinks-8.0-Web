import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboards/dashboard1',
  },
  {
    displayName: 'Task & Document Trackers',
    iconName: 'checklist',
    route: '/dashboards/dashboard2',
  },
  {
    displayName: 'Document Trees',
    iconName: 'sitemap',
    route: '/dashboards/dashboard13',
  },
  {
    displayName: 'Recently Viewed',
    iconName: 'clock-hour-4',
    route: '/dashboards/dashboard133',
  },
  {
    displayName: 'Notifications',
    iconName: 'bell',
    route: '/dashboards/dashboard331',
  },
  {
    displayName: 'Favorites',
    iconName: 'star',
    route: '/dashboards/dashboard233',
  },
  {
    displayName: 'Reports',
    iconName: 'report',
    route: '/dashboards/dashboard133',
  },
];
