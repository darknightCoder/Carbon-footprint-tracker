import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { Login2Module } from 'app/main/pages/authentication/login-2/login-2.module';
import { RegisterModule } from 'app/main/pages/authentication/register/register.module';
import { Register2Module } from 'app/main/pages/authentication/register-2/register-2.module';
import { ForgotPasswordModule } from 'app/main/pages/authentication/forgot-password/forgot-password.module';
import { ForgotPassword2Module } from 'app/main/pages/authentication/forgot-password-2/forgot-password-2.module';
import { ResetPasswordModule } from 'app/main/pages/authentication/reset-password/reset-password.module';
import { ResetPassword2Module } from 'app/main/pages/authentication/reset-password-2/reset-password-2.module';
import { LockModule } from 'app/main/pages/authentication/lock/lock.module';
import { MailConfirmModule } from 'app/main/pages/authentication/mail-confirm/mail-confirm.module';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        Login2Module,
        RegisterModule,
        Register2Module,
        ForgotPasswordModule,
        ForgotPassword2Module,
        ResetPasswordModule,
        ResetPassword2Module,
        LockModule,
 
    ]
})
export class PagesModule
{

}
