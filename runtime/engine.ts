// runtime/engine.ts

import { AppModule, CommandModule, RegisterFunction, ViewletModule, WidgetModule } from './types';
import { modulesToRegister } from './registry';

class RuntimeEngine {
  private modules: AppModule[] = [];
  private initialized = false;

  constructor() {
    // Bind the event handler to this instance to ensure `this` is correct when called
    this.handleDynamicRegister = this.handleDynamicRegister.bind(this);
  }

  initialize() {
    if (this.initialized) {
        console.warn('[Runtime] Engine already initialized.');
        return;
    }
    this.discoverAndRegisterModules();
    // Listen for requests from any part of the app to dynamically register a new module
    window.addEventListener('request-dynamic-register', this.handleDynamicRegister as EventListener);
    this.initialized = true;
  }

  /**
   * Handles the 'request-dynamic-register' event to register a module.
   * @param event The custom event containing the registration function in its detail.
   */
  private handleDynamicRegister(event: CustomEvent<RegisterFunction>) {
    const registerFn = event.detail;
    if (typeof registerFn === 'function') {
      this.registerModuleDynamically(registerFn);
    } else {
      console.error('[Runtime] Invalid detail received for dynamic registration request.');
    }
  }

  private discoverAndRegisterModules() {
    console.log(`[Runtime] Discovering modules...`);
    for (const registerFn of modulesToRegister) {
      const module = registerFn();
      this.modules.push(module);
      console.log(`[Runtime] Registered module: ${'name' in module ? module.name : module.id} (${module.type})`);
    }
    console.log(`[Runtime] Module registration complete. Total: ${this.modules.length}`);
  }

  /**
   * Registers a new module at runtime.
   * @param registerFn The registration function for the new module.
   */
  registerModuleDynamically(registerFn: RegisterFunction) {
    try {
      const module = registerFn();
      // Avoid duplicates
      if (this.modules.some(m => m.id === module.id)) {
        console.warn(`[Runtime] Module with ID '${module.id}' is already registered. Skipping.`);
        return;
      }
      this.modules.push(module);
      console.log(`[Runtime] Dynamically registered module: ${'name' in module ? module.name : module.id} (${module.type})`);
    } catch (error) {
      console.error('[Runtime] Failed to dynamically register module:', error);
    }
  }

  /**
   * Retrieves all registered modules of a specific type.
   * @param type The type of module to retrieve ('FEATURE', 'WIDGET', etc.)
   * @returns An array of modules matching the requested type.
   */
  getModules<T extends AppModule>(type: T['type']): T[] {
    return this.modules.filter((m): m is T => m.type === type);
  }
  
  /**
   * Retrieves all registered viewlet modules.
   * @returns An array of all viewlet modules.
   */
  getViewlets(): ViewletModule[] {
    return this.getModules<ViewletModule>('VIEWLET');
  }

  /**
   * Retrieves all registered command modules.
   * @returns An array of all command modules.
   */
  getCommands(): CommandModule[] {
    return this.getModules<CommandModule>('COMMAND');
  }

  /**
   * Retrieves all registered widget modules.
   * @returns An array of all widget modules.
   */
  getWidgets(): WidgetModule[] {
    return this.getModules<WidgetModule>('WIDGET');
  }
}

// Create a singleton instance of the engine to be used throughout the app.
export const runtimeEngine = new RuntimeEngine();
