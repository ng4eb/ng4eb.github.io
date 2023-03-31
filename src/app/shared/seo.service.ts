import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
    title: string;
    description: string;
    keywords: string;
    path: string;
    imageConfig?: {
        image: string;
        width?: string;
        height?: string;
        alt?: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(private _title: Title, private _meta: Meta) {}

    setSEO(seoConfig: SeoConfig) {
        // basics
        this._title.setTitle(`${seoConfig.title} - ng4eb`);
        this._meta.updateTag({ name: 'description', content: seoConfig.description });
        this._meta.updateTag({ name: 'url', content: `https://www.ng4eb.com${seoConfig.path}` });
        // open graph
        this._meta.updateTag({ name: 'og:title', content: `${seoConfig.title} - ng4eb` });
        this._meta.updateTag({ name: 'og:description', content: seoConfig.description });
        this._meta.updateTag({ name: 'og:url', content: `https://www.ng4eb.com${seoConfig.path}` });
        seoConfig.imageConfig && this._meta.updateTag({ name: 'og:image', content: seoConfig.imageConfig.image });
        seoConfig.imageConfig?.width &&
            this._meta.updateTag({
                name: 'og:image:width',
                content: seoConfig.imageConfig.width
            });
        seoConfig.imageConfig?.height &&
            this._meta.updateTag({
                name: 'og:image:height',
                content: seoConfig.imageConfig.height
            });
        seoConfig.imageConfig?.alt && this._meta.updateTag({ name: 'og:image:alt', content: seoConfig.imageConfig.alt });
        // twitter
        this._meta.updateTag({ name: 'twitter:title', content: `${seoConfig.title} - ng4eb` });
        this._meta.updateTag({ name: 'twitter:description', content: seoConfig.description });
        this._meta.updateTag({ name: 'twitter:url', content: `https://www.ng4eb.com${seoConfig.path}` });
        this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    }
}
