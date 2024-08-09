//config.ts

enum LayoutType {
  MIX = 'mix',
  TOP = 'top',
  SIDE = 'side',
}

const CONFIG = {
  appName: 'moneymindz',
  helpLink: 'https://github.com/iBz-04/Dashboard-starter',
  enablePWA: true,
  theme: {
    accentColor: '#838cf9',
    sidebarLayout: LayoutType.MIX,
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'moneymindz',
    description: 'A dashboard UI solution for Saas and web apps.',
    imageURL: 'logo.svg',
  },
};

export default CONFIG;
