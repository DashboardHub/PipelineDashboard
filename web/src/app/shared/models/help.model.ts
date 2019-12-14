import { HelpTopic } from '@shared/models/index.model';

export class HelpModel {
  icon: string;
  title: string;
  content: string;
  topics: HelpTopic[] = [
    {
      title: 'Quickstart',
      description: 'Overview information on getting started',
      icon: 'emoji_flags',
      path: 'quickstart',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Glossary',
      description: 'Coming Soon',
      icon: 'menu_book',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Create Project',
      description: 'Coming Soon',
      icon: 'create_new_folder',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Edit Project',
      description: 'Coming Soon',
      icon: 'edit',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Delete Project',
      description: 'Coming Soon',
      icon: 'delete_forever',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'How to support us',
      description: 'Coming Soon',
      icon: 'question_answer',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
    {
      title: 'Why Open Source?',
      description: 'Coming Soon',
      icon: 'code',
      path: 'coming-soon',
      updatedAt: '09/13/2019 09:05 AM',
    },
  ];
}
