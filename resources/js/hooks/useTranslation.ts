import { usePage } from '@inertiajs/react';

interface TranslationProps {
    translations: {
        common: Record<string, any>;
        page: Record<string, any>;
        locale: string;
    };
}

export function useTranslation() {
    const { translations } = usePage<TranslationProps>().props;

    const getNestedValue = (obj: any, path: string): string | undefined => {
        return path.split('.').reduce((prev, curr) => {
            return prev && prev[curr] !== undefined ? prev[curr] : undefined;
        }, obj);
    };

    const t = (key: string) => {
        if (key.startsWith('common.')) {
            const actualKey = key.replace('common.', '');
            return getNestedValue(translations.common, actualKey) || key;
        }

        if (key.startsWith('page.')) {
            const actualKey = key.replace('page.', '');
            return getNestedValue(translations.page, actualKey) || key;
        }

        return getNestedValue(translations.page, key) 
            || getNestedValue(translations.common, key) 
            || key;
    };

    return { t, locale: translations.locale };
}