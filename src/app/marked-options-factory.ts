import {MarkedOptions, MarkedRenderer} from 'ngx-markdown';

export function MarkedOptionsFactory(): MarkedOptions {
	const renderer = new MarkedRenderer();

	renderer.link = (href: string, title: string, text: string) => `<a href=${href} target="_blank" rel="noreferrer">${text}</a>`;
	renderer.image = (href: string, title: string) => `<img class="md-img" alt=${title} src=${href} height="300" />`;

	return {
		renderer,
		gfm: true,
		breaks: false,
		pedantic: false,
		smartLists: true,
		smartypants: false,
	};
}