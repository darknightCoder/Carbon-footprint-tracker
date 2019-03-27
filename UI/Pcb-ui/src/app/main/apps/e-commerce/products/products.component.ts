import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseConfigService } from '@fuse/services/config.service';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector     : 'e-commerce-products',
    templateUrl  : './products.component.html',
    styleUrls    : ['./products.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EcommerceProductsComponent implements OnInit
{
    dataSource;
    displayedColumns = ['gid', 'name', 'channel', 'category', 'price', 'quantity', 'active'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

   public  isAdmin:String;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _ecommerceProductsService: EcommerceProductsService,
        private _fuseConfigService:FuseConfigService,
        private httpClient: HttpClient
    )
    {
        // Set the private defaults

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.getProducts()
        .subscribe((data) => {
            console.log(data);
            this.dataSource = data;

        });



    }
    getProducts(){
       
           return this.httpClient.get('http://137.117.81.211:9090/users')


    }
}


