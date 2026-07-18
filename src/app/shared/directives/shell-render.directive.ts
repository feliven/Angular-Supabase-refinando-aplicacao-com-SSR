import { isPlatformServer } from '@angular/common';
import {
  Directive,
  inject,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
  type OnInit,
} from '@angular/core';

@Directive({
  selector: '[appShellRenderDirective]',
})
export class ShellRenderDirective implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
