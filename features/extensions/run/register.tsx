// features/extensions/run/register.tsx

import { RegisterFunction, ViewletModule } from '../../../runtime/types';
import { ExtensionsIcon } from '../../../assets/icons';
import ExtensionsView from '../ExtensionsView';

export const register: RegisterFunction = (): ViewletModule => ({
  type: 'VIEWLET',
  id: 'extensions',
  name: 'Extensions',
  icon: ExtensionsIcon,
  component: ExtensionsView,
  position: 'bottom',
});