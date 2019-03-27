import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector     : 'e-commerce-product',
    templateUrl  : './product.component.html',
    styleUrls    : ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EcommerceProductComponent implements OnInit, OnDestroy
{
    product:any = {};
    iot:any = {};
    productForm: FormGroup;
    pageType:String= 'new'

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceProductService: EcommerceProductService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private httpClient: HttpClient,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update product on changes
        this.productForm = this.createProductForm();

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [''],
            name            : [this.product.name],
            email          : [this.product.email],
            org            : [this.product.org],
            description     : [this.product.description],
            tags            : [this.product.tags],
            password          : [this.product.password],
            deviceId    : [this.iot.deviceId],
            deviceType    : [this.iot.deviceType],
            boilerId         : [this.iot.boilerId],
            longitude   : [this.iot.longitude],
            latitude        : [this.iot.latitude],
            channel             : [this.product.channel],
            delay           : [this.product.delay],
        });
    }

    /**
     * Save product
     */
    saveProduct(): void
    {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceProductService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add product
     */
    addProduct(): void
    {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this.saveIndustry(data)
        .subscribe((data) => {
            this._matSnackBar.open('Added the Organization in the hyperledger network', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
            this._matSnackBar.open('Create channel', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

            // Change the location with new one
            this.saveIot(data)
            .subscribe((data) => {
                this._matSnackBar.open('Added the IOT', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
                this._location.go('apps/e-commerce/products/');  
            });
           
        });

    }
    saveIndustry(body){
        const bodyTest = {
            'name': this.productForm.value.name || 'TEST',
            'email': this.productForm.value.email || 'noreply@test.com',
            'password': this.productForm.value.password || 'pass',
            'role': 1,
            'org': this.productForm.value.org || 'test',
            'channel': this.productForm.value.channel || 'channel_fertlizers_pcb'
        };
        console.log(bodyTest);
        return this.httpClient.post('http://137.117.81.211:9090/users', bodyTest);
    }
    saveIot(body){
        const bodyTest = {
            'deviceId': this.productForm.value.deviceId || 'D009',
            'deviceType': this.productForm.value.deviceType || 'Barometer',
            'boilerId': this.productForm.value.boilerId || 'B84',
            'longitude': this.productForm.value.longitude || '43N',
            'latitude': this.productForm.value.longitude || '12E'
        };
        console.log(bodyTest);
        return this.httpClient.post('http://137.117.81.211:9090/devices', bodyTest);
    }
    getProducts(){
        return this.httpClient.get('http://137.117.81.211:9090/');
    }
}
