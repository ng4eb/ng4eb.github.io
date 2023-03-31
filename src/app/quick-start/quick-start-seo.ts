import { SeoConfig } from '../shared/seo.service';

export const quickStartSeo: Record<string, Omit<SeoConfig, 'path'>> = {
    newToAngular: {
        title: 'New to Angular',
        description: 'New to Angular? Great to see you! This free eBook is for you to begin your wonderful journey in the Angular world!',
        keywords: 'Angular, eBook, free, online, quick start, ng4eb, learning, journey, reference'
    },
    whyThisBook: {
        title: 'Why This Book',
        description: 'Why this book? Because this book is written with simplicity in mind. It aims to cover the basic knowledge and skills you need to get started in Angular within a short time.',
        keywords: 'Angular, eBook, free, online, quick start, ng4eb, concise, basics, core knowledge, core skills'
    },
    resources: {
        title: 'Resources',
        description: 'Here is a list of free resources that are great for learning more about Angular.',
        keywords: 'Angular, resources, free, online, quick start, ng4eb'
    }
};
