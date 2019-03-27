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
        let req={
            email:this.loginForm.value.email,
            password:this.loginForm.value.password
        }
        return new Promise((resolve,reject)=>{
            this._httpClient.post(`http://137.117.81.211:9090/sessions/login`,req).subscribe((response:any)=>{
               let role;
               if(response==null){
                this.router.navigateByUrl('/login');
               }
               if(response.role=='2'){
                   role='admin'
               }else if (response.role=='1'){
                   role='company'
               }else{
                this.router.navigateByUrl('/login');
               }
                this._fuseConfigService.setRole(role);
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