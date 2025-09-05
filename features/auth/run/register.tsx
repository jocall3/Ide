// features/auth/run/register.tsx

import { RegisterFunction, ViewletModule } from '../../../runtime/types';
import { AuthIcon } from '../../../assets/icons';
import AuthView from '../AuthView';

export const register: RegisterFunction = (): ViewletModule => ({
  type: 'VIEWLET',
  id: 'auth',
  name: 'Authentication',
  icon: AuthIcon,
  component: AuthView,
  position: 'bottom',
});
