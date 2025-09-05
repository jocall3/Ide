// features/notes/run/register.tsx

import { RegisterFunction, ViewletModule } from '../../../runtime/types';
import { NotesIcon } from '../../../assets/icons';
import NotesView from '../Notes';

export const register: RegisterFunction = (): ViewletModule => ({
  type: 'VIEWLET',
  id: 'notes',
  name: 'Notes',
  icon: NotesIcon,
  component: NotesView,
  position: 'top',
});
