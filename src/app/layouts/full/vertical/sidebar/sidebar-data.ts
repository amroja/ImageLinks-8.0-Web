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

  // قسم الـ Trackers
  {
    navCap: 'Trackers',
  },
  {
    displayName: 'Inbox',
    iconName: 'inbox',
    isTracker: true,
    trackerCount: 5,
    trackerCategory: 'Document Classes in Inbox',
    trackerTotal: 15,
    trackerDocuments: [
      { id: '1', title: 'New Submissions', subtitle: 'Awaiting Review' },
      { id: '2', title: 'Incoming Requests', subtitle: 'Customer Service' },
      { id: '3', title: 'Draft Documents', subtitle: 'In Progress' },
    ],
  },
  {
    displayName: 'View only',
    iconName: 'eye',
    isTracker: true,
    trackerCount: 12,
    trackerCategory: 'Document Classes in View only',
    trackerTotal: 28,
    trackerDocuments: [
      { id: '1', title: 'Read-only Documents', subtitle: 'Archive' },
      { id: '2', title: 'Reference Materials', subtitle: 'Documentation' },
    ],
  },
  {
    displayName: 'Outbox',
    iconName: 'send',
    isTracker: true,
    trackerCount: 2,
    trackerCategory: 'Document Classes in Outbox',
    trackerTotal: 8,
    trackerDocuments: [
      { id: '1', title: 'Sent Documents', subtitle: 'Delivered' },
      { id: '2', title: 'Pending Delivery', subtitle: 'In Transit' },
    ],
  },
  {
    displayName: 'Follow up',
    iconName: 'clock',
    isTracker: true,
    trackerCount: 8,
    trackerCategory: 'Document Classes in Follow up',
    trackerTotal: 33,
    trackerDocuments: [
      { id: '1', title: 'Documents for Review', subtitle: 'Quality Assurance' },
      { id: '2', title: 'Urgent Follow-ups', subtitle: 'Priority Queue' },
      { id: '3', title: 'Pending Actions', subtitle: 'Workflow Management' },
    ],
  },
  {
    displayName: 'Manager monitor',
    iconName: 'users',
    isTracker: true,
    trackerCount: 15,
    trackerCategory: 'Document Classes in Manager monitor',
    trackerTotal: 45,
    trackerDocuments: [
      { id: '1', title: 'Team Performance', subtitle: 'Monthly Reports' },
      { id: '2', title: 'Task Assignments', subtitle: 'Active Projects' },
      { id: '3', title: 'Approval Requests', subtitle: 'Pending Review' },
    ],
  },
  {
    displayName: 'Created by me',
    iconName: 'edit',
    isTracker: true,
    trackerCount: 6,
    trackerCategory: 'Document Classes in Created by me',
    trackerTotal: 18,
    trackerDocuments: [
      { id: '1', title: 'My Documents', subtitle: 'Personal Files' },
      { id: '2', title: 'Draft Templates', subtitle: 'Work in Progress' },
    ],
  },
  {
    displayName: 'Generalization',
    iconName: 'layers',
    isTracker: true,
    trackerCount: 4,
    trackerCategory: 'Document Classes in Generalization',
    trackerTotal: 12,
    trackerDocuments: [
      { id: '1', title: 'General Templates', subtitle: 'Standard Forms' },
      { id: '2', title: 'Common Procedures', subtitle: 'Guidelines' },
    ],
  },
  {
    displayName: 'Completed tasks',
    iconName: 'circle-check',
    isTracker: true,
    trackerCount: 24,
    trackerCategory: 'Document Classes in Completed tasks',
    trackerTotal: 120,
    trackerDocuments: [
      { id: '1', title: 'Finished Projects', subtitle: 'Archived' },
      { id: '2', title: 'Closed Tasks', subtitle: 'Completed' },
      { id: '3', title: 'Delivered Documents', subtitle: 'Final Version' },
    ],
  },

  {
    navCap: 'Other',
  },
  {
    displayName: 'Notifications',
    iconName: 'bell',
    route: '/dashboards/dashboard331',
    chip: true,
    chipContent: '3',
    chipClass: 'bg-error text-white',
  },
  {
    displayName: 'Favorites',
    iconName: 'star',
    route: '/dashboards/dashboard233',
  },
  {
    displayName: 'Reports',
    iconName: 'file-analytics',
    route: '/dashboards/dashboard133',
  },
];
