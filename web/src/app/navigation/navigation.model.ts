import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface {
  public model: Array<any> = [];
  public public: Object = {
    id: 'public',
    title: 'Public',
    // translate: 'NAV.PUBLIC',
    type: 'group',
    children: [
      {
        id: 'public-environments',
        title: 'Public Environments',
        // translate: 'NAV.PUBLICENVIRONMENTS.TITLE',
        type: 'item',
        icon: 'lock_open',
        url: '/public',
        // 'badge': {
        //     'title': 16,
        //     // 'translate': 'NAV.PUBLICENVIRONMENTS.BADGE',
        //     'bg'   : '#F44336',
        //     'fg'   : '#FFFFFF'
        // }
      },
      {
        id: 'pricing',
        title: 'Features',
        // translate: 'NAV.PUBLICENVIRONMENTS.TITLE',
        type: 'item',
        icon: 'attach_money',
        url: '/pricing',
        // 'badge': {
        //     'title': 3,
        //     // 'translate': 'NAV.PUBLICENVIRONMENTS.BADGE',
        //     'bg'   : 'green',
        //     'fg'   : '#FFFFFF'
        // }
      },
      {
        id: 'help',
        title: 'Help',
        // translate: 'NAV.PUBLICENVIRONMENTS.TITLE',
        type: 'item',
        icon: 'help',
        url: '/help',
        // 'badge': {
        //     'title': 3,
        //     // 'translate': 'NAV.PUBLICENVIRONMENTS.BADGE',
        //     'bg'   : 'green',
        //     'fg'   : '#FFFFFF'
        // }
      }
    ]
  };
  public private: Array<any> = [
    {
      id: 'my-environments',
      title: 'My Environments',
      // translate: 'NAV.MYENVIRONMENTS.TITLE',
      type: 'item',
      icon: 'lock',
      url: '/environment/list',
      // 'badge': {
      //     'title': 3,
      //     // 'translate': 'NAV.MYENVIRONMENTS.BADGE',
      //     'bg'   : 'blue',
      //     'fg'   : '#FFFFFF'
      // }
    },
    {
      id: 'environment-add',
      title: 'Add Environment',
      // 'translate': 'NAV.MYENVIRONMENTS.TITLE',
      type: 'item',
      icon: 'add_circle',
      url: '/environment/add'
    }
  ];
  public account: Array<any> = [
    {
      id: 'profile',
      title: 'Profile',
      // translate: 'NAV.MYENVIRONMENTS.TITLE',
      type: 'item',
      icon: 'verified_user',
      url: '/profile'
    }
  ];

  constructor() {
    this.model.push(this.public);
    this.model.push({
      id: 'private',
      title: 'Private',
      // translate: 'NAV.PRIVATE',
      type: 'group',
      children: []
    });
    this.model.push({
      id: 'account',
      title: 'Account',
      // translate: 'NAV.PRIVATE',
      type: 'group',
      children: []
    });
  }
}
