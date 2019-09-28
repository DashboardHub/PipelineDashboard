import { HelpTopic } from '@shared/models/index.model';

export class HelpModel {
  icon: string;
  title: string;
  content: string;
  topics: HelpTopic[] = [
    {
      title: 'Quickstart',
      description: 'Overview information on getting started',
      icon: 'quickstart_icon',
      path: 'quickstart',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Glossary',
      description: 'Coming Soon',
      icon: 'glosary_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Create Project',
      description: 'Coming Soon',
      icon: 'create_enviroment_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Edit Project',
      description: 'Coming Soon',
      icon: 'edit_enviroment_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Delete Project',
      description: 'Coming Soon',
      icon: 'delete_enviroment_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'How to support us',
      description: 'Coming Soon',
      icon: 'how_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Why Open Source?',
      description: 'Coming Soon',
      icon: 'why_icon',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
  ];
}
