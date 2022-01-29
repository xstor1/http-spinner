import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, ViewRef} from '@angular/core';
import {HttpProgressState, HttpSpinnerService, IHttpState} from './http-spinner.service';
import {Subscription} from 'rxjs';

// @ts-ignore
@Component({
  selector: 'http-spinner',
  template: `
    <div *ngIf="loading" class="loading-container">
      <div class="loading">
        <div *ngIf="customLoading" class="relative">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 173.87 96.19">
            <g id="Page-1">
              <g>
                <g id="Group">
                  <path id="Path" class="cls-1 "
                        d="M4.7,71.94C8.15,78.54,14.5,82.59,23,82.69l.15-.2a22.17,22.17,0,0,1-6.4-6.95c-5.95-10.75-4.1-25.9,4.55-37.95a48.83,48.83,0,0,1,3.6-4.35h0C16.25,35.59,10.7,41.19,6.3,48.79S1.25,65.34,4.7,71.94Z"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-2 "
                        d="M16.75,75.49a21.6,21.6,0,0,0,6.4,7c8.15,6,20.9,8.7,31.6,7.25A33.3,33.3,0,0,1,42.2,74.14c-4.75-11.8-3.55-26.65,3.75-39.7a62.36,62.36,0,0,1,15.9-18.35l-.2-.25c-12.35.5-27.4,7.55-36.75,17.4a36.09,36.09,0,0,0-3.6,4.35C12.6,49.59,10.8,64.79,16.75,75.49Z"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-3 "
                        d="M42.2,74.19A33.3,33.3,0,0,0,54.75,89.74h0A30.23,30.23,0,0,0,61.5,93a37,37,0,0,0,30.35-3.5,25.76,25.76,0,0,1-2.25-1.6c-14.85-12.35-13.4-38.5.2-56.5,7.3-9.6,19-17.7,30.85-19v-.2c-9.45-8.5-24.9-10.85-39.5-6.35a59.9,59.9,0,0,0-19.3,10.25A62.36,62.36,0,0,0,46,34.49C38.65,47.54,37.45,62.39,42.2,74.19Z"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-4 "
                        d="M91.85,89.54c8.25,5,21.6,5,31-2.9l.2-.3a16.94,16.94,0,0,1-4.25-2.4c-9.85-7.85-8.6-22.35-3-34.3A51.81,51.81,0,0,1,130.9,30.49,30.51,30.51,0,0,1,146.7,25l.05-.25c-4.45-8.4-14.15-13.3-25.2-12.45-.3.05-.6.05-1,.1-11.8,1.3-23.55,9.35-30.85,19-13.65,18-15,44.15-.2,56.5C90.3,88.49,91.05,89,91.85,89.54Z"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-5 "
                        d="M147.65,25c-.3,0-.65-.05-1-.05a29.64,29.64,0,0,0-15.8,5.45,51.81,51.81,0,0,0-15,19.15c-5.65,11.95-6.9,26.45,3,34.3a16.11,16.11,0,0,0,4.25,2.4c8.9,3.45,22,.6,31.35-6.05,11.55-8.2,17.9-22.55,17-34.4C170.45,34.94,161.25,23.79,147.65,25Z"
                        transform="translate(-0.02 -1.14)"/>
                </g>
                <g>
                  <path class="cls-6"
                        d="M146.75,24.79c-4.45-8.4-14.15-13.3-25.2-12.45-.3.05-.6.05-1,.1-11.8,1.3-23.55,9.35-30.85,19-13.65,18-15,44.15-.2,56.5a14.13,14.13,0,0,0,2.25,1.6c8.25,5,21.6,5,31-2.9"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-6" d="M54.75,89.74A30.23,30.23,0,0,0,61.5,93a37,37,0,0,0,30.35-3.5c.05-.05.1-.05.15-.1"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-6"
                        d="M120.65,12.24c-9.45-8.5-24.9-10.85-39.5-6.35a59.9,59.9,0,0,0-19.3,10.25A62.36,62.36,0,0,0,46,34.49c-7.3,13.1-8.5,27.9-3.75,39.7A33.3,33.3,0,0,0,54.75,89.74"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-6"
                        d="M61.65,15.89c-12.35.5-27.4,7.55-36.75,17.4a36.09,36.09,0,0,0-3.6,4.35c-8.65,12-10.5,27.2-4.55,38a21.6,21.6,0,0,0,6.4,7c8.15,6,20.9,8.7,31.6,7.25h0"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-6"
                        d="M147.65,25c-.3,0-.65-.05-1-.05a29.64,29.64,0,0,0-15.8,5.45,51.81,51.81,0,0,0-15,19.15c-5.65,11.95-6.9,26.45,3,34.3a16.11,16.11,0,0,0,4.25,2.4c8.9,3.45,22,.6,31.35-6.05,11.55-8.2,17.9-22.55,17-34.4-.85-10.9-10.05-22.05-23.65-20.8h-.2"
                        transform="translate(-0.02 -1.14)"/>
                  <path class="cls-6" d="M24.9,33.24c-8.6,2.35-14.15,7.95-18.55,15.55s-5,16.5-1.65,23.1S14.5,82.54,23,82.64"
                        transform="translate(-0.02 -1.14)"/>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div *ngIf="!customLoading">
          <mat-spinner></mat-spinner>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['http-spinner.component.scss']
})
export class HttpSpinnerComponent implements AfterViewChecked, OnDestroy {
  public loading = false;
  public subs?: Subscription;
  @Input()
  public customLoading = true;
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
            } else if (!progress.url.includes(item)) {
              oldThis.loading = (progress.state === HttpProgressState.start);
              if (oldThis.changeDetector && !(oldThis.changeDetector as ViewRef).destroyed) {
                oldThis.changeDetector.detectChanges();
              }
            }
          });
        } else {
          if (!this.filterBy) {
            this.loading = this.httpStateService.states.filter(y => y.state === HttpProgressState.start).length > 0;
            if (this.changeDetector && !(this.changeDetector as ViewRef).destroyed) {
              this.changeDetector.detectChanges();
            }
          } else if (progress.url.indexOf(this.filterBy) === -1) {
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
