/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  //{
  //  id: 'welcome',
  //  icon: 'img/icon/apps.svg',
  //  label: 'navBar.welcome',
  //  to: '/viadeUO265431/welcome'
  //},
  {
    id: 'profile',
    //icon: '/img/people.svg',
    icon: 'img/icon/perfil.png',
    label: 'navBar.profile',
    to: '/viadeUO265431/profile'
  },

  {
    id:'addRoute',
    icon:'img/icon/addRoute.png',
    label:'navBar.addRoute',
    to: '/viadeUO265431/addRoute'
  },

  {
    id:'uploadRoute',
    icon:'img/icon/uploadRoute.png',
    label:'navBar.uploadRoute',
    to: '/viadeUO265431/uploadRoute'
  },
  {
    id:'viewRoute',
    icon:'img/icon/viewRoute.png',
    label:'navBar.viewRoute',
    to: '/viadeUO265431/viewRoute'
  },
  {
    id:'friends',
    icon:'img/icon/amigos.png',
    label:'navBar.friends',
    to: '/viadeUO265431/friends'
  },
  {
    id:'routList',
    icon:'img/icon/listRoute.png',
    label:'navBar.routList',
    to:'/viadeUO265431/routList'
  }
,
  {
    id:'mapa',
    icon:'img/icon/mapa.png',
    label:'navBar.mapa',
    to: '/viadeUO265431/mapa'
  }

];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
