import { isPlatformServer } from '@angular/common';
import { Directive, inject, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShellNoRenderDirective]',
})
export class ShellNoRenderDirective {
  private platformId = inject(PLATFORM_ID);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
