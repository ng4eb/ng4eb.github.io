import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './custom-url-serializer';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { MarkedOptionsFactory } from './marked-options-factory';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        LayoutModule,
        SharedModule,
        HttpClientModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: {
                provide: MarkedOptions,
                useFactory: MarkedOptionsFactory
            }
        }),
        LoadingBarRouterModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        {
            provide: UrlSerializer,
            useClass: CustomUrlSerializer
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
