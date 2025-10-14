declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"kohler-vs-american-standard-toilets-which-one-is-right-for-your-home.md": {
	id: "kohler-vs-american-standard-toilets-which-one-is-right-for-your-home.md";
  slug: "kohler-vs-american-standard-toilets-which-one-is-right-for-your-home";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};
"services": {
"bathroom-renovation-stone-harbor-nj.md": {
	id: "bathroom-renovation-stone-harbor-nj.md";
  slug: "bathroom-renovation-stone-harbor-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"drain-cleaning-ocean-city-nj.md": {
	id: "drain-cleaning-ocean-city-nj.md";
  slug: "drain-cleaning-ocean-city-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"emergency-plumber-atlantic-city-nj.md": {
	id: "emergency-plumber-atlantic-city-nj.md";
  slug: "emergency-plumber-atlantic-city-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"emergency-plumber-cape-may-county.md": {
	id: "emergency-plumber-cape-may-county.md";
  slug: "emergency-plumber-cape-may-county";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"emergency-plumber-egg-harbor-township.md": {
	id: "emergency-plumber-egg-harbor-township.md";
  slug: "emergency-plumber-egg-harbor-township";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"emergency-plumber-millville-nj.md": {
	id: "emergency-plumber-millville-nj.md";
  slug: "emergency-plumber-millville-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"emergency-plumber-ocean-city-nj.md": {
	id: "emergency-plumber-ocean-city-nj.md";
  slug: "emergency-plumber-ocean-city-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"emergency-plumber-vineland-nj.md": {
	id: "emergency-plumber-vineland-nj.md";
  slug: "emergency-plumber-vineland-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"emergency-plumber-wildwood-nj.md": {
	id: "emergency-plumber-wildwood-nj.md";
  slug: "emergency-plumber-wildwood-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"leak-detection-ocean-city-nj.md": {
	id: "leak-detection-ocean-city-nj.md";
  slug: "leak-detection-ocean-city-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"pipe-repair-ocean-city-nj.md": {
	id: "pipe-repair-ocean-city-nj.md";
  slug: "pipe-repair-ocean-city-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"plumbing-inspection-avalon-nj.md": {
	id: "plumbing-inspection-avalon-nj.md";
  slug: "plumbing-inspection-avalon-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"plumbing-repair-ocean-city-nj.md": {
	id: "plumbing-repair-ocean-city-nj.md";
  slug: "plumbing-repair-ocean-city-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"sewer-line-repair-cape-may-nj.md": {
	id: "sewer-line-repair-cape-may-nj.md";
  slug: "sewer-line-repair-cape-may-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"tankless-water-heater-stone-harbor-nj.md": {
	id: "tankless-water-heater-stone-harbor-nj.md";
  slug: "tankless-water-heater-stone-harbor-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"water-heater-installation-avalon-nj.md": {
	id: "water-heater-installation-avalon-nj.md";
  slug: "water-heater-installation-avalon-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
"water-line-repair-stone-harbor-nj.md": {
	id: "water-line-repair-stone-harbor-nj.md";
  slug: "water-line-repair-stone-harbor-nj";
  body: string;
  collection: "services";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
