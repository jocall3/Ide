// features/settings/run/register.tsx

import { RegisterFunction, ViewletModule } from '../../../runtime/types';
import { SettingsIcon } from '../../../assets/icons';
import SettingsView from '../SettingsView';

export const register: RegisterFunction = (): ViewletModule => ({
  type: 'VIEWLET',
  id: 'settings',
  name: 'Settings',
  icon: SettingsIcon,
  component: SettingsView,
  position: 'bottom',
});