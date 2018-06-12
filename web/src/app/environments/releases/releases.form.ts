import { ITdDynamicElementConfig, TdDynamicElement } from '@covalent/dynamic-forms';
import { List } from '../../list';
import { Token } from '../tokens/token.model';
import { Environment } from '../environment.model';

export class ReleasesForm {

  private tokens: { label: string, value: string }[];
  public elements: ITdDynamicElementConfig[];

  constructor(tokens: List<Token>, environment: Environment) {
    this.tokens = tokens.list.map((token: Token) => {
      return {
        label: token.name,
        value: token.id,
      };
    });

    let states: { label: string, value: string }[];

    switch (environment.type) {
      case 'build':
        states = [{ label: 'Start Build', value: 'startBuild' }, { label: 'Finish Build', value: 'finishBuild' }];
        break;
      case 'deploy':
        states = [{ label: 'Start Deploy', value: 'startDeploy' }, { label: 'Finish Deploy', value: 'finishDeploy' }];
        break;
      case 'build-deploy':
      default:
        states = [
          { label: 'Start Build', value: 'startBuild' },
          { label: 'Finish Build', value: 'finishBuild' },
          { label: 'Start Deploy', value: 'startDeploy' },
          { label: 'Finish Deploy', value: 'finishDeploy' },
        ];
        break;
    }

    this.elements = [
      {
        name: 'version',
        label: 'Version',
        type: TdDynamicElement.Input,
        required: true,
        minLength: 3,
        maxLength: 32,
        flex: 30,
      },
      {
        name: 'token',
        label: 'Token',
        type: TdDynamicElement.Select,
        required: true,
        selections: this.tokens,
        default: 'Please select',
        flex: 40,
      },
      {
        name: 'state',
        label: 'State',
        type: TdDynamicElement.Select,
        required: true,
        selections: states,
        default: 'Please select',
        flex: 30,
      },
    ];
  }
}
