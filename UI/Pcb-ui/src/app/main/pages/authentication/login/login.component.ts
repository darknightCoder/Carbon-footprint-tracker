import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    showLoginBox:boolean

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private _httpClient: HttpClient
       
    )
    
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.showLoginBox=true
    }
    doLogin(){
        
        //console.log(this.loginForm.value.email)
        let param=this.loginForm.value.email;
        return new Promise((resolve,reject)=>{
            this._httpClient.get(`http://localhost:9090/users/${param}`).subscribe((response:any)=>{
               
                this._fuseConfigService.setRole(response.role);
                console.log("role is : " + this._fuseConfigService.getRole())
                resolve(response);
            },reject)
        })
    }

    login (){
        this.showLoginBox=false;
    this.doLogin();
        this.router.navigateByUrl('apps/dashboards/analytics');
    }
}

// getAQI():Promise<any>
//     {
//         return new Promise((resolve,reject)=>{
//             this._httpClient.get('http://localhost:9090/pollutions/aqi').subscribe((response:any)=>{
//                 this.abc=response;
//                 console.log(this.abc)
//                 debugger;
//                 resolve(response);
//             },reject)
//         })
//     }