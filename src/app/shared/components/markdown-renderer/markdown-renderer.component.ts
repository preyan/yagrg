import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation, inject } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-markdown-renderer',
  standalone: false,
  templateUrl: './markdown-renderer.component.html',
  styleUrl: './markdown-renderer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MarkdownRendererComponent implements OnChanges {
  @Input() markdown = '';

  private markdown$ = new BehaviorSubject<string>('');
  private sanitizer = inject(DomSanitizer);

  public renderedHtml$: Observable<SafeHtml> = this.markdown$.pipe(
    switchMap(md => from(marked.parse(md))),
    map(html => this.sanitizer.bypassSecurityTrustHtml(html))
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markdown']) {
      this.markdown$.next(this.markdown);
    }
  }
}

