import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/apps/dashboards/analytics',
                      
                    },
                    {
                        id   : 'project',
                        title: 'Overview',
                        type : 'item',
                        url  : '/apps/dashboards/project',
                      
                    }
                ]
            },

            {
                id       : 'e-commerce',
                title    : 'Data In Detail',
                translate: 'NAV.ECOMMERCE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
               
                children : [
                    {
                        id        : 'products',
                        title     : 'Industries',
                        type      : 'item',
                        url       : '/apps/e-commerce/products',
                        exactMatch: true,
                        
                    },
                    {
                        id        : 'productDetail',
                        title     : 'Industry Detail',
                        type      : 'item',
                        url       : '/apps/e-commerce/products/1/printed-dress',
                        exactMatch: true,
                      

                    },
                    
                ]
            },
           
        ]
    }
];

export const companyNavigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/apps/dashboards/analytics',
                     
                    },
                    {
                        id   : 'project',
                        title: 'Overview',
                        type : 'item',
                        url  : '/apps/dashboards/project',
                       
                    }
                ]
            },

            {
                id       : 'e-commerce',
                title    : 'Data In Detail',
                translate: 'NAV.ECOMMERCE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
               
                children : [
                    {
                        id        : 'products',
                        title     : 'Industries',
                        type      : 'item',
                        url       : '/apps/e-commerce/products',
                        exactMatch: true,
                        
                    }
                   
                    
                ]
            },
           
        ]
    }
];