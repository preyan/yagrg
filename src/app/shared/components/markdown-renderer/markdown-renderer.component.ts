import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation, inject } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-markdown-renderer',
  standalone: false,
  templateUrl: './markdown-renderer.component.html',
  styleUrl: './markdown-renderer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MarkdownRendererComponent implements OnChanges {
  @Input() markdown = '';
  renderedHtml: SafeHtml = '';

  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markdown']) {
      this.render();
    }
  }

  private async render(): Promise<void> {
    const rawHtml = await marked.parse(this.markdown);
    this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }
}
