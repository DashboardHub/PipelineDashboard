import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
      this.model = [
        {
          'id'      : 'public',
          'title'   : 'Public',
          // 'translate': 'NAV.PUBLIC',
          'type'    : 'group',
          'children': [
            {
              'id'   : 'public-environments',
              'title': 'Public Environments',
              // 'translate': 'NAV.PUBLICENVIRONMENTS.TITLE',
              'type' : 'item',
              'icon' : 'lock_open',
              'url'  : '/environments',
              // 'badge': {
              //     'title': 16,
              //     // 'translate': 'NAV.PUBLICENVIRONMENTS.BADGE',
              //     'bg'   : '#F44336',
              //     'fg'   : '#FFFFFF'
              // }
            },
            {
              'id'   : 'pricing',
              'title': 'Pricing',
              // 'translate': 'NAV.PUBLICENVIRONMENTS.TITLE',
              'type' : 'item',
              'icon' : 'attach_money',
              'url'  : '/pricing',
              // 'badge': {
              //     'title': 3,
              //     // 'translate': 'NAV.PUBLICENVIRONMENTS.BADGE',
              //     'bg'   : 'green',
              //     'fg'   : '#FFFFFF'
              // }
            }
          ]
        },
        {
          'id'      : 'private',
          'title'   : 'Private',
          // 'translate': 'NAV.PRIVATE',
          'type'    : 'group',
          'children': [
            {
              'id'   : 'my-environments',
              'title': 'My Environments',
              // 'translate': 'NAV.MYENVIRONMENTS.TITLE',
              'type' : 'item',
              'icon' : 'lock',
              'url'  : '/environments/list',
              // 'badge': {
              //     'title': 3,
              //     // 'translate': 'NAV.MYENVIRONMENTS.BADGE',
              //     'bg'   : 'blue',
              //     'fg'   : '#FFFFFF'
              // }
            },
            {
              'id'   : 'environment-add',
              'title': 'Add Environment',
              // 'translate': 'NAV.MYENVIRONMENTS.TITLE',
              'type' : 'item',
              'icon' : 'add_circle',
              'url'  : '/environments/add'
            }
          ]
        },
        {
          'id'      : 'account',
          'title'   : 'Account',
          // 'translate': 'NAV.PRIVATE',
          'type'    : 'group',
          'children': [
            {
              'id'   : 'profile',
              'title': 'Profile',
              // 'translate': 'NAV.MYENVIRONMENTS.TITLE',
              'type' : 'item',
              'icon' : 'verified_user',
              'url'  : '/profile'
            }
          ]
        }
      ];
    }
}
