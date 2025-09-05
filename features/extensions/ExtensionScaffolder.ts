// features/extensions/ExtensionScaffolder.ts
import React from 'react';
import { extensionAIService } from './ExtensionAIService';
import { fileService } from '../../services/fileService';
import { useUIStore } from '../../store/uiStore';
import { RegisterFunction, ViewletModule } from '../../runtime/types';

class ExtensionScaffolder {
  async scaffoldFromPrompt(prompt: string) {
    console.log('[Scaffolder] Starting scaffolding process...');
    
    // 1. Call AI to get the extension structure
    const aiResponse = await extensionAIService.generateExtension(prompt);
    const { featureName, componentName, viewletName, viewletIcon, componentContent } = aiResponse;

    if (!featureName || !componentName || !viewletName || !viewletIcon || !componentContent) {
      throw new Error('AI response was malformed. Missing required fields.');
    }

    // 2. Write the new component file to the in-memory file system
    const componentPath = `/features/${featureName}/${componentName}.tsx`;
    fileService.writeFile(componentPath, componentContent);

    // 3. Dynamically import the new component code string
    const blob = new Blob([componentContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);

    try {
      const newModule = await import(/* @vite-ignore */ url);
      const NewComponent = newModule.default;

      if (!NewComponent || typeof NewComponent !== 'function') {
        throw new Error(`Generated component file did not have a valid default export.`);
      }

      // 4. Create a simple component to render the emoji icon
      const EmojiIcon: React.FC<{ className?: string }> = ({ className }) => 
        React.createElement('div', { className, style: { fontSize: '24px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, viewletIcon);

      // 5. Build the registration function in memory
      const registerFn: RegisterFunction = (): ViewletModule => ({
        type: 'VIEWLET',
        id: featureName,
        name: viewletName,
        icon: EmojiIcon,
        component: NewComponent,
        position: 'top',
      });

      // 6. Dispatch an event to request dynamic registration.
      // This avoids a direct, circular dependency on the runtime engine module.
      const event = new CustomEvent<RegisterFunction>('request-dynamic-register', { detail: registerFn });
      window.dispatchEvent(event);

    } catch (e) {
      console.error("Error importing or registering dynamic module:", e);
      throw new Error("Failed to load or execute generated component code.");
    } finally {
      URL.revokeObjectURL(url);
    }

    // 7. Notify the UI to update its components (e.g., ActivityBar)
    useUIStore.getState().incrementModulesVersion();
    
    console.log(`[Scaffolder] Scaffolding complete for feature: ${featureName}`);
    return { featureName };
  }
}

export const extensionScaffolder = new ExtensionScaffolder();
