import { Injectable, Type, ViewContainerRef, ComponentRef, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentFactoryService {
  private componentRegistry = new Map<string, Type<any>>();

  registerComponent(key: string, component: Type<any>) {
    this.componentRegistry.set(key, component);
  }

  createComponent(key: string, viewContainerRef: ViewContainerRef, injector: Injector): ComponentRef<any> {
    const componentType = this.componentRegistry.get(key);
    if (!componentType) {
      throw new Error(`Component not registered for key: ${key}`);
    }
    return viewContainerRef.createComponent(componentType, { injector });
  }
}
