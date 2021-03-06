import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent, MockDirective } from 'ng-mocks';

import { ServerHtmlDirective } from 'ish-core/directives/server-html.directive';
import { ModalDialogLinkComponent } from 'ish-shared/components/common/modal-dialog-link/modal-dialog-link.component';

import { BasketApprovalInfoComponent } from './basket-approval-info.component';

describe('Basket Approval Info Component', () => {
  let component: BasketApprovalInfoComponent;
  let fixture: ComponentFixture<BasketApprovalInfoComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [
        BasketApprovalInfoComponent,
        MockComponent(FaIconComponent),
        MockComponent(ModalDialogLinkComponent),
        MockDirective(ServerHtmlDirective),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketApprovalInfoComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should not display an approval required link if there is no approval input', () => {
    fixture.detectChanges();
    expect(element.querySelector('.approval-required')).toBeFalsy();
  });

  it('should display an approval required link if there is an approval input', () => {
    component.approval = { approvalRequired: true };

    fixture.detectChanges();
    expect(element.querySelector('[data-testing-id="approval-required"]')).toBeTruthy();
    expect(element.querySelector('ish-modal-dialog-link')).toBeTruthy();
  });

  it('should display customer approvers if customer approval is needed', () => {
    component.approval = {
      approvalRequired: true,
      customerApproval: {
        approvers: [
          { email: 'jlink@test.intershop.de', firstName: 'Jack', lastName: 'Link' },
          { email: 'bboldner@test.intershop.de', firstName: 'Bernhard', lastName: 'Boldner' },
        ],
      },
    };

    fixture.detectChanges();
    expect(element.querySelector('table').textContent).toMatchInlineSnapshot(
      `"Jack Linkjlink@test.intershop.deBernhard Boldnerbboldner@test.intershop.de"`
    );
  });

  it('should display cost center approvers if customer approval is needed', () => {
    component.approval = {
      approvalRequired: true,
      costCenterApproval: {
        approvers: [{ email: 'pmiller@test.intershop.de', firstName: 'Patricia', lastName: 'Miller' }],
        costCenterID: '4711',
      },
    };

    fixture.detectChanges();
    expect(element.querySelector('table').textContent).toMatchInlineSnapshot(
      `"Patricia Millerpmiller@test.intershop.de"`
    );
  });
});
