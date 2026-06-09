export const navbarItemsByRole = {
  traveller: [
    { label: 'home', path: '/traveller-dashboard' },
    { label: 'Plan Route', path: '/plane-route' },
    { label: 'My Trips', path: '/mytrips' },
    { label: 'Explore Places', path: '/explore-places' },
    { label: 'Bookings', path: '/bookings' },
    { label: 'Weather', path: '/crowd-forecasting' },
  ],

  guide: [
    { label: 'home', path: '/guide/home' },
    { label: 'Tour Requests', path: '/guide/requests' },
    { label: 'Assigned Tours', path: '/guide/tours' },
    { label: 'Availability', path: '/guide/availability' },
    { label: 'Earnings', path: '/guide/earnings' },
    { label: 'Messages', path: '/guide/messages' },
    { label: 'Profile', path: '/guide/profile' }
  ],

  vendor: [
    { label: 'Dashboard', path: '/vendor/dashboard' },
    { label: 'Property/Package', path: '/vendor/listings' },
    { label: 'Bookings', path: '/vendor/bookings' },
    { label: 'Offers', path: '/vendor/offers' },
    { label: 'Reviews', path: '/vendor/reviews' },
    { label: 'Earnings', path: '/vendor/earnings' },
    { label: 'Profile', path: '/vendor/profile' }
  ],

  admin: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Guides', path: '/admin/guides' },
    { label: 'Vendors', path: '/admin/vendors' },
    { label: 'Routes', path: '/admin/routes' },
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Settings', path: '/admin/settings' }
  ],

  superAdmin: [
    { label: 'Dashboard', path: '/super-admin/dashboard' },
    { label: 'All Users', path: '/super-admin/users' },
    { label: 'Role Management', path: '/super-admin/roles' },
    { label: 'Analytics', path: '/super-admin/analytics' },
    { label: 'System Settings', path: '/super-admin/settings' },
    { label: 'Audit Logs', path: '/super-admin/audit-logs' }
  ]
};