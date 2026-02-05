import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation, inject, signal } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Observable, from, timer } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

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

  /** Signal to track if content is being typed */
  public isTyping = signal(false);

  public renderedHtml$: Observable<SafeHtml> = this.markdown$.pipe(
    tap(() => this.isTyping.set(true)),
    switchMap(md => from(marked.parse(md))),
    map(html => this.sanitizer.bypassSecurityTrustHtml(html)),
    tap(() => {
      // Brief typing indicator
      timer(300).subscribe(() => this.isTyping.set(false));
    })
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markdown']) {
      this.markdown$.next(this.markdown);
    }
  }
}
