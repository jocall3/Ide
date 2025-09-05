// components/widgets/system-status/run/register.tsx
import { RegisterFunction, WidgetModule } from '../../../../runtime/types';
import SystemStatus from '../SystemStatus';

export const register: RegisterFunction = (): WidgetModule => ({
  type: 'WIDGET',
  id: 'system.status',
  component: SystemStatus,
  alignment: 'right',
});