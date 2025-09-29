import limax from '..';

const input: string = 'foo bar baz';

const slug: string = limax(input);
const slugWithOptions: string = limax(input, { separator: '_', custom: ['.'] });
const slugWithAllOptions: string = limax(input, {
    separator: '_',
    replacement: '-',
    maintainCase: true,
    tone: true,
    custom: { 'o': '0' },
    lang: 'en',
});
const slugWithLangOnly: string = limax(input, { lang: 'de' });

// @ts-expect-error
limax(123);

// @ts-expect-error
limax(input, { separator: 123 });

// @ts-expect-error
limax(input, { replacement: 123 });

// @ts-expect-error
limax(input, { maintainCase: 'true' });

// @ts-expect-error
limax(input, { tone: 'true' });

// @ts-expect-error
limax(input, { custom: 'not-an-object' });

// @ts-expect-error
limax(input, { lang: 123 });

// @ts-expect-error
limax(input, { unknownOption: true });
