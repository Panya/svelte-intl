import formatMessage, { SetupOptions } from 'format-message';
import { DeepStringObj } from './util';
export interface Translations {
    [key: string]: DeepStringObj;
}
export declare const defaultOptions: SetupOptions;
export declare const options: {
    set: (value: formatMessage.SetupOptions) => void;
    subscribe: (run: (value: formatMessage.SetupOptions) => void, invalidate?: ((value?: formatMessage.SetupOptions | undefined) => void) | undefined) => () => void;
    update: (newTranslations: formatMessage.SetupOptions) => void;
};
export declare const translations: {
    set: (value: Translations) => void;
    subscribe: (run: (value: Translations) => void, invalidate?: ((value?: Translations | undefined) => void) | undefined) => () => void;
    update: (newTranslations: Translations) => void;
};
export declare const locales: import("svelte/store").Readable<string[]>;
export declare const locale: {
    subscribe: (run: (value: string) => void, invalidate?: ((value?: string | undefined) => void) | undefined) => () => void;
    update: (updater: (value: string) => string) => void;
    set: (newLocale: string) => boolean;
};
export declare const translate: import("svelte/store").Readable<typeof formatMessage>;
export declare const _: import("svelte/store").Readable<typeof formatMessage>;
/** For tests */
export declare const clear: () => void;
