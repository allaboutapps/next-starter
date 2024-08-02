"use client";

import { IS_SERVER } from "@/config";
import { PrimitiveType } from "intl-messageformat";
import { createIntl, createIntlCache, FormattedMessage, IntlShape } from "react-intl";
import { DEFAULT_LOCALE, locales, Locales } from "./locales";
import { intlMessages, MessageIDS } from "./util";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { german } from "./de";

const cache = createIntlCache();

export let intl: IntlShape & { showStringKeys?: boolean };

export const setLocale = (locale: Locales) => {
    if (locales.indexOf(locale) === -1) {
        locale = DEFAULT_LOCALE;
    }

    if (intl?.locale === locale) {
        return intl;
    }

    intl = createIntl(
        {
            locale: locale,
            messages: intlMessages[locale],
        },
        cache,
    );

    if (!IS_SERVER) {
        document.documentElement.lang = locale;
    }

    console.log(`%cSet locale to "${locale}".`, "background: #eee; color: #666;");
    return intl;
};

function returnString(messageId: MessageIDS, translation: string) {
    return intl.showStringKeys ? `${String(messageId)} (${translation})` : translation;
}

// Detailed explanation of how the typings below work:
// https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#splitting-a-string-literal-type

/**
 * Returns a union type "param1" | "param2" for the placeholders in the given <Translation> = "Hello {param1}, how are you {param2}?"
 */
type Placeholders<Translation extends string> = Translation extends `${string}{${infer Placeholder}}${infer Rest}`
    ? Placeholder | Placeholders<Rest>
    : never;

/**
 * Converts the union type "param1" | "param2" to an object type { param1: PrimitiveType, param2: PrimitiveType }
 */
type ParamsForTranslation<Translation extends string> =
    Placeholders<Translation> extends never
        ? never
        : {
              [Key in Placeholders<Translation>]: PrimitiveType;
          };

type TranslationForID<ID extends MessageIDS> = (typeof german)[ID];

/**
 * Builds the param type for a given messageId.
 * Explanation for "MessageIDS extends ID":
 *   If you have a var dynamicID of type string that is constructed (e.g. depending on user input/settings).
 *   For example "greetings.male" or "greetings.female" and then cast to MessageIDS (using dynamicID as MessageIDS),
 *   the type system will not be able to infer if the messageId is correct and if parameters are needed.
 *   In that case because you casted to MessageIDS using "as MessageIDS" the type will incorporate all MessageIDS
 *   so MessageIDS extends ID will be true. And therefore ParamsForID<ID> will be never.
 *   If you don't use a variable but a const or something where the compiler can infer the const value, then MessageIDS will
 *   not extend ID because ID will then be a single MessageID and thus narrower than MessageIDS.
 */
type ParamsForID<ID extends MessageIDS> = MessageIDS extends ID ? never : ParamsForTranslation<TranslationForID<ID>>;

/**
 * Returns the translation for the given `messageId` using an optional dictionary to replace placeholders in the text.
 */
export function t<ID extends MessageIDS, Params extends ParamsForID<ID>>(
    ...parameters: [Params] extends [never]
        ? [messageId: ID, values?: Record<string, PrimitiveType>] // cover case where type inference fails -> make values optional
        : [messageId: ID, values: Params]
): TranslationForID<ID> {
    const [messageId, values] = parameters;
    return returnString(messageId, intl.formatMessage({ id: messageId }, values)) as TranslationForID<ID>;
}

export function tHtml<ID extends MessageIDS, Params extends ParamsForID<ID>>(
    ...parameters: [Params] extends [never]
        ? [messageId: ID, values?: Record<string, PrimitiveType>] // cover case where type inference fails -> make values optional
        : [messageId: ID, values: Params]
) {
    const [messageId, values] = parameters;
    return intl.showStringKeys ? (
        `${String(messageId)} (${intl.formatMessage({ id: messageId })})`
    ) : (
        <FormattedMessage
            key={messageId}
            id={messageId}
            values={{
                b: (chunks) => (
                    <b>
                        <>{chunks}</>
                    </b>
                ),
                i: (chunks) => (
                    <i>
                        <>{chunks}</>
                    </i>
                ),
                br: () => <br />,

                // This is a more complex example of how to use it with e.g. <a> or other HTML elements.
                // This example defines the attributes manually, but lets you dynamically
                // set the <a> content. The "chunks" param is everything you put between
                // your custom tags ("aPrivacyPolicy" are the tags in this example).
                // If you write "<aPrivacyPolicy>this is a link to my privacy policy</aPrivacyPolicy>" in your translation
                // you will get a link as defined below with the text "this is a link to my privacy policy".
                // aPrivacyPolicy: (chunks) => {
                //     const link: MessageIDS = "links.privacy_policy";
                //     return (
                //         <a href={intl.formatMessage({ id: link })} target="_blank" rel="noopener noreferrer">
                //             {chunks}
                //         </a>
                //     );
                // },
                ...values,
            }}
        />
    );
}
