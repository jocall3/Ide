// features/commands/welcome/run/register.tsx

import { RegisterFunction, CommandModule } from '../../../../runtime/types';

export const register: RegisterFunction = (): CommandModule => ({
  type: 'COMMAND',
  id: 'app.welcome',
  title: 'Show Welcome Message',
  handler: () => {
    alert('Welcome to your scalable IDE!');
  },
});