import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { MarkdownRendererComponent } from './markdown-renderer.component';

describe('MarkdownRendererComponent', () => {
  let component: MarkdownRendererComponent;
  let fixture: ComponentFixture<MarkdownRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkdownRendererComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MarkdownRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render markdown to html on init', async () => {
    component.markdown = '# Hello';
    component.ngOnChanges({
      markdown: new SimpleChange('', '# Hello', true)
    });

    fixture.detectChanges();
    const html = await new Promise<any>(resolve => {
      component.renderedHtml$.subscribe(val => {
        if (val) resolve(val);
      });
    });

    expect(html).toBeDefined();
  });


  it('should not render if markdown does not change', () => {
    const nextSpy = vi.spyOn((component as any).markdown$, 'next');
    component.ngOnChanges({});
    expect(nextSpy).not.toHaveBeenCalled();
  });
});


