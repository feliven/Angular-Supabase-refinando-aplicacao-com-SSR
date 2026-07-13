import { PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ShellRenderDirective } from './shell-render.directive';

describe('ShellRenderDirective', () => {
  it('should create an instance', () => {
    const mockTemplateRef = {} as TemplateRef<any>;
    const mockViewContainerRef = {} as ViewContainerRef;

    TestBed.configureTestingModule({
      providers: [
        ShellRenderDirective,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: TemplateRef, useValue: mockTemplateRef },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new ShellRenderDirective());
    expect(directive).toBeTruthy();
  });

  it('should render template on server', () => {
    const mockTemplateRef = {} as TemplateRef<any>;
    const mockViewContainerRef = {
      createEmbeddedView: vi.fn(),
      clear: vi.fn(),
    } as unknown as ViewContainerRef;

    TestBed.configureTestingModule({
      providers: [
        ShellRenderDirective,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: TemplateRef, useValue: mockTemplateRef },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new ShellRenderDirective());
    directive.ngOnInit();

    expect(mockViewContainerRef.createEmbeddedView).toHaveBeenCalledWith(mockTemplateRef);
    expect(mockViewContainerRef.clear).not.toHaveBeenCalled();
  });

  it('should clear container on browser', () => {
    const mockTemplateRef = {} as TemplateRef<any>;
    const mockViewContainerRef = {
      createEmbeddedView: vi.fn(),
      clear: vi.fn(),
    } as unknown as ViewContainerRef;

    TestBed.configureTestingModule({
      providers: [
        ShellRenderDirective,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: TemplateRef, useValue: mockTemplateRef },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new ShellRenderDirective());
    directive.ngOnInit();

    expect(mockViewContainerRef.clear).toHaveBeenCalled();
    expect(mockViewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });
});
