// features/search/run/register.tsx

import { RegisterFunction, ViewletModule } from '../../../runtime/types';
import { SearchIcon } from '../../../assets/icons';
import SearchView from '../SearchView';

export const register: RegisterFunction = (): ViewletModule => ({
  type: 'VIEWLET',
  id: 'search',
  name: 'Search',
  icon: SearchIcon,
  component: SearchView,
  position: 'top',
});