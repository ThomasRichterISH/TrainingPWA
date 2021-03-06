import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { CMSFacade } from 'ish-core/facades/cms.facade';
import { ContentPageletView } from 'ish-core/models/content-view/content-view.model';
import { whenTruthy } from 'ish-core/utils/operators';
import { CMSComponentProvider, CMS_COMPONENT } from 'ish-shared/cms/configurations/injection-keys';
import { CMSComponent } from 'ish-shared/cms/models/cms-component/cms-component.model';

/**
 * The Content Pagelet Component renders the pagelet for the given 'pageletId'.
 * For the rendering an Angular component is used that has to be provided
 * for the DefinitionQualifiedName of the pagelet.
 *
 * @example
 * <ish-content-pagelet [pageletId]="pagelet"></ish-content-pagelet>
 */
@Component({
  selector: 'ish-content-pagelet',
  templateUrl: './content-pagelet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPageletComponent implements OnChanges, OnInit, OnDestroy {
  /**
   * The Id of the Pagelet that is to be rendered.
   */
  @Input() pageletId: string;

  @ViewChild('cmsOutlet', { read: ViewContainerRef, static: true }) cmsOutlet: ViewContainerRef;

  private pageletId$ = new ReplaySubject<string>(1);
  private destroy$ = new Subject<void>();

  constructor(private injector: Injector, private cmsFacade: CMSFacade, private cdRef: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.pageletId$
      .pipe(
        switchMap(pageletId => this.cmsFacade.pagelet$(pageletId)),
        whenTruthy(),
        takeUntil(this.destroy$)
      )
      .subscribe(pagelet => {
        this.mapComponent(pagelet);
        this.cdRef.markForCheck();
      });
  }

  ngOnChanges() {
    this.pageletId$.next(this.pageletId);
  }

  private mapComponent(pagelet: ContentPageletView) {
    const components = this.injector.get<CMSComponentProvider[]>(CMS_COMPONENT, []);
    const mappedComponent = components.find(c => c.definitionQualifiedName === pagelet.definitionQualifiedName);

    if (mappedComponent) {
      const componentRef = this.createComponent(mappedComponent);
      this.initializeComponent(componentRef.instance, pagelet);
    } else {
      console.warn(`did not find mapping for ${pagelet.id} (${pagelet.definitionQualifiedName})`);
    }
  }

  private createComponent(mappedComponent: CMSComponentProvider) {
    this.cmsOutlet.clear();
    return this.cmsOutlet.createComponent(mappedComponent.class);
  }

  private initializeComponent(instance: CMSComponent, pagelet: ContentPageletView) {
    instance.pagelet = pagelet;

    // OnChanges has to be manually invoked on dynamically created components
    if (instance.ngOnChanges) {
      instance.ngOnChanges({ pagelet: new SimpleChange(undefined, pagelet, true) });
    }
  }
}
