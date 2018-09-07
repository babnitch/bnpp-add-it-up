import { ComponentFactoryResolver, Component, ComponentFactory } from '@angular/core';
import { AddItUpComponent } from '../add-it-up/add-it-up.component';

export class ComponentHelper {
  static createComponent(type, resolver: ComponentFactoryResolver, container: any) {
    const factory = resolver.resolveComponentFactory(AddItUpComponent);
    const componentRef = container.createComponent(factory);
    componentRef.instance.type = type;
    return componentRef.instance;
  }
}
