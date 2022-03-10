import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {UrlSerializer} from '@angular/router';
import {CustomUrlSerializer} from './custom-url-serializer';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {
	MarkedOptionsFactory
} from './marked-options-factory';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule.withServerTransition({appId: 'serverApp'}),
		AppRoutingModule,
		LayoutModule,
		SharedModule,
		MarkdownModule.forRoot({
				markedOptions: {
					provide: MarkedOptions,
					useFactory: MarkedOptionsFactory,
				}
			},
		),
		LoadingBarRouterModule,
	],
	providers: [
		{
			provide: UrlSerializer,
			useClass: CustomUrlSerializer
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
