import { TemplateRef, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ShellNoRenderDirective } from './shell-no-render.directive';

describe('ShellNoRenderDirective', () => {
  const mockTemplateRef = {} as TemplateRef<unknown>;
  let mockViewContainerRef: {
    createEmbeddedView: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  function createDirective(platformId: string): ShellNoRenderDirective {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: platformId },
        { provide: TemplateRef, useValue: mockTemplateRef },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
      ],
    });
    return TestBed.runInInjectionContext(() => new ShellNoRenderDirective());
  }

  beforeEach(() => {
    mockViewContainerRef = { createEmbeddedView: vi.fn(), clear: vi.fn() };
  });

  it('should create an instance', () => {
    expect(createDirective('browser')).toBeTruthy();
  });
});
