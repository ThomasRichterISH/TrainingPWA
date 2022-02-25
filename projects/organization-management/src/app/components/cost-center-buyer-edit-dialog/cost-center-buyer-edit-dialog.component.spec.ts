import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SpecialValidators } from '@intershop-pwa/formly/validators/special-validators';
import { TranslateModule } from '@ngx-translate/core';
import { instance, mock } from 'ts-mockito';

import { AppFacade } from 'ish-core/facades/app.facade';
import { FormlyTestingModule } from 'ish-shared/formly/dev/testing/formly-testing.module';

import { OrganizationManagementFacade } from '../../facades/organization-management.facade';

import { CostCenterBuyerEditDialogComponent } from './cost-center-buyer-edit-dialog.component';

describe('Cost Center Buyer Edit Dialog Component', () => {
  let component: CostCenterBuyerEditDialogComponent;
  let fixture: ComponentFixture<CostCenterBuyerEditDialogComponent>;
  let element: HTMLElement;
  let appFacade: AppFacade;
  let organizationManagementFacade: OrganizationManagementFacade;
  let fb: FormBuilder;

  beforeEach(async () => {
    appFacade = mock(AppFacade);
    organizationManagementFacade = mock(organizationManagementFacade);

    await TestBed.configureTestingModule({
      declarations: [CostCenterBuyerEditDialogComponent],
      imports: [FormlyTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: AppFacade, useFactory: () => instance(appFacade) },
        { provide: OrganizationManagementFacade, useFactory: () => instance(organizationManagementFacade) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterBuyerEditDialogComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fb = TestBed.inject(FormBuilder);
    component.costCenterBuyerForm = fb.group({
      login: ['jlink@test.intershop.de'],
      budgetValue: [123, [SpecialValidators.moneyAmount]],
      budgetPeriod: ['monthly'],
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should not submit a form when the user does not provide money format for budget', () => {
    component.costCenterBuyerForm = fb.group({
      budgetValue: ['abc', [SpecialValidators.moneyAmount]],
    });

    fixture.detectChanges();

    expect(component.formDisabled).toBeFalse();
    component.submitCostCenterBuyerForm();

    expect(component.formDisabled).toBeTrue();
  });

  it('should display all form input fields for cost center buyer update', () => {
    fixture.detectChanges();

    expect(JSON.stringify(component.fields)).toContain('buyerName');
    expect(JSON.stringify(component.fields)).toContain('budgetValue');
    expect(JSON.stringify(component.fields)).toContain('budgetPeriod');
  });
});
