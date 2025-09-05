// features/explorer/run/register.tsx

import { RegisterFunction, ViewletModule } from '../../../runtime/types';
import { FilesIcon } from '../../../assets/icons';
import ExplorerView from '../ExplorerView';

export const register: RegisterFunction = (): ViewletModule => ({
  type: 'VIEWLET',
  id: 'explorer',
  name: 'Explorer',
  icon: FilesIcon,
  component: ExplorerView,
  position: 'top',
});