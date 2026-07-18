import { PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ShellRenderDirective } from './shell-render.directive';

describe('ShellRenderDirective', () => {
  const mockTemplateRef = {} as TemplateRef<unknown>;
  let mockViewContainerRef: {
    createEmbeddedView: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  function createDirective(platformId: string): ShellRenderDirective {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: platformId },
        { provide: TemplateRef, useValue: mockTemplateRef },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
      ],
    });
    return TestBed.runInInjectionContext(() => new ShellRenderDirective());
  }

  beforeEach(() => {
    mockViewContainerRef = { createEmbeddedView: vi.fn(), clear: vi.fn() };
  });

  it('should create an instance', () => {
    expect(createDirective('browser')).toBeTruthy();
  });

  it('should render template on server', () => {
    createDirective('server').ngOnInit();
    expect(mockViewContainerRef.createEmbeddedView).toHaveBeenCalledWith(mockTemplateRef);
    expect(mockViewContainerRef.clear).not.toHaveBeenCalled();
  });

  it('should clear container on browser', () => {
    createDirective('browser').ngOnInit();
    expect(mockViewContainerRef.clear).toHaveBeenCalled();
    expect(mockViewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });
});
