// runtime/registry.ts
// This file is the central "manifest" for all dynamic modules in the app.
// To add a new viewlet, command, etc., simply add its register function
// to the `modulesToRegister` array.

import { RegisterFunction } from './types';
import { register as registerDashboard } from '../features/dashboard/run/register';
import { register as registerExplorer } from '../features/explorer/run/register';
import { register as registerSearch } from '../features/search/run/register';
import { register as registerNotes } from '../features/notes/run/register';
import { register as registerAuth } from '../features/auth/run/register';
import { register as registerSettings } from '../features/settings/run/register';
import { register as registerExtensions } from '../features/extensions/run/register';
import { register as registerWelcomeCommand } from '../features/commands/welcome/run/register';
import { register as registerThemeCommand } from '../features/commands/theme/run/register';
import { register as registerSystemStatus } from '../components/widgets/system-status/run/register';


export const modulesToRegister: RegisterFunction[] = [
  // Viewlets
  registerDashboard,
  registerExplorer,
  registerSearch,
  registerNotes,
  registerAuth,
  registerSettings,
  registerExtensions,

  // Commands
  registerWelcomeCommand,
  registerThemeCommand,
  
  // Widgets
  registerSystemStatus,
];
