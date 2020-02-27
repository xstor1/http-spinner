import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewRef} from '@angular/core';
import {HttpProgressState, HttpSpinnerService, IHttpState} from './http-spinner.service';

@Component({
  selector: 'http-spinner',
  template: `
    <div class="loading-container">
      <div *ngIf="loading" class="loading">
        <mat-spinner></mat-spinner>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: ['.loading-container { position: relative;}  .loading {\n' +
  '  position: absolute;\n' +
  '  top: 0;\n' +
  '  left: 0;\n' +
  '  bottom: 0;\n' +
  '  right: 0;\n' +
  '  z-index: 1;\n' +
  '  display: flex;\n' +
  '  align-items: center;\n' +
  '  justify-content: center;\n' +
  '}\n']
})
export class HttpSpinnerComponent implements AfterViewChecked, OnDestroy {
  public loading = false;
  public subs;
  @Input() public filterBy: string | Array<string> | null = null;

  constructor(private httpStateService: HttpSpinnerService, private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    this.subs = this.httpStateService.state.subscribe((progress: IHttpState) => {
      if (progress && progress.url) {
        if (Array.isArray(this.filterBy)) {
          const oldThis = this;
          this.filterBy.forEach(item => {
            if (!item) {
              oldThis.loading = (progress.state === HttpProgressState.start);
              if (oldThis.changeDetector && !(oldThis.changeDetector as ViewRef).destroyed) {
                oldThis.changeDetector.detectChanges();
              }
            } else if (progress.url.indexOf(item) !== -1) {
              oldThis.loading = (progress.state === HttpProgressState.start);
              if (oldThis.changeDetector && !(oldThis.changeDetector as ViewRef).destroyed) {
                oldThis.changeDetector.detectChanges();
              }
            }
          });
        } else {
          if (!this.filterBy) {
            this.loading = (progress.state === HttpProgressState.start);
            if (this.changeDetector && !(this.changeDetector as ViewRef).destroyed) {
              this.changeDetector.detectChanges();
            }
          } else if (progress.url.indexOf(this.filterBy) !== -1) {
            this.loading = (progress.state === HttpProgressState.start);
            if (this.changeDetector && !(this.changeDetector as ViewRef).destroyed) {
              this.changeDetector.detectChanges();
            }
          }
        }
      }
    });

  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
