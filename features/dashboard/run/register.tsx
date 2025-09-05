// features/dashboard/run/register.tsx

import { RegisterFunction, ViewletModule } from '../../../runtime/types';
import { DashboardIcon } from '../../../assets/icons';
import DashboardView from '../DashboardView';

export const register: RegisterFunction = (): ViewletModule => ({
  type: 'VIEWLET',
  id: 'dashboard',
  name: 'Dashboard',
  icon: DashboardIcon,
  component: DashboardView,
  position: 'top',
});
