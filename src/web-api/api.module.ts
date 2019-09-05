import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { DiariesService } from './api/diaries.service';
import { EintrgeService } from './api/eintrge.service';
import { GrantManagementService } from './api/grantManagement.service';
import { UserManagementService } from './api/userManagement.service';
import { UtilService } from './api/util.service';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        DiariesService,
        EintrgeService,
        GrantManagementService,
        UserManagementService,
        UtilService]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: ApiModule,
        @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
}

export function baseConfig() { return new Configuration({ basePath: "http://localhost:8889" }) }
