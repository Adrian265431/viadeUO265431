/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'profile',
    icon: 'img/icon/perfil.png',
    label: 'navBar.profile',
    to: '/viadeUO265431/profile'
  },
   {
    id:'friends',
    icon:'img/icon/amigos.png',
    label:'navBar.friends',
    to: '/viadeUO265431/friends'
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
    id:'routList',
    icon:'img/icon/listRoute.png',
    label:'navBar.routList',
    to:'/viadeUO265431/routList'
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
