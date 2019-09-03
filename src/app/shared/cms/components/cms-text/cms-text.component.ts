import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContentPageletView } from 'ish-core/models/content-view/content-views';
import { CMSComponent } from '../../models/cms-component/cms-component.model';

@Component({
  selector: 'ish-cms-text',
  templateUrl: './cms-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMSTextComponent implements CMSComponent {
  @Input() pagelet: ContentPageletView;
}