import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { LoginCredentials } from 'ish-core/models/credentials/credentials.model';
import { HttpError } from 'ish-core/models/http-error/http-error.model';
import { markAsDirtyRecursive } from '../../../../shared/forms/utils/form-utils';

/**
 * The Login Form Component displays a login form. See also {@link LoginFormContainerComponent}.
 *
 * @example
 * <ish-login-form
 *  [loginType]="userRegistrationLoginType"
 *  [error]="loginError$ | async"
 *  (login)="loginUser($event)"
 * ></ish-login-form>
 */
@Component({
  selector: 'ish-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  /**
   * email or username
   */
  @Input() loginType: string;
  @Input() error: HttpError;
  @Output() login = new EventEmitter<LoginCredentials>();

  form: FormGroup;
  submitted = false;

  ngOnInit() {
    let loginValidator;
    if (this.loginType === 'email') {
      loginValidator = CustomValidators.email;
    } else {
      loginValidator = Validators.nullValidator;
    }

    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, loginValidator]),
      password: new FormControl('', Validators.required),
    });
  }

  get buttonDisabled() {
    return this.form.invalid && this.submitted;
  }

  submitForm() {
    if (this.form.invalid) {
      this.submitted = true;
      markAsDirtyRecursive(this.form);
      return;
    }

    this.login.emit(this.form.value);
  }

  isUnauthorized() {
    return !!this.error && this.error.status === 401;
  }
}