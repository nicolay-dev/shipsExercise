import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRolStatus]'
})
export class RolStatusDirective {
  @Input()
  set appRolStatus(rol: string) {
    this.renderElement(rol);
  }

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  renderElement(rol: string) { 
    if (rol === 'admin') {
      this.viewContainer.createEmbeddedView(this.template)
    } else {
      this.viewContainer.clear();
    }
  }

}
