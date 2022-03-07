import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {UrlSerializer} from '@angular/router';
import {CustomUrlSerializer} from './custom-url-serializer';
import {
	HttpClient,
	HttpClientModule
} from '@angular/common/http';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {
	MarkedOptionsFactory
} from './marked-options-factory';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		LayoutModule,
		SharedModule,
		HttpClientModule,
		MarkdownModule.forRoot({
				loader: HttpClient,
				markedOptions: {
					provide: MarkedOptions,
					useFactory: MarkedOptionsFactory,
				}
			},
		)
	],
	providers: [
		{
			provide: UrlSerializer,
			useClass: CustomUrlSerializer
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
