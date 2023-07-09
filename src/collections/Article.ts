import { CollectionConfig } from "payload/types";
import { CategoryType } from "./Category";
import formatSlug from "../utilities/formatSlug";

export type ArticleType = {
	title: string;
	slug: string;
	description: string;
	content: string;
	category: CategoryType;
	meta: {
		title?: string;
		description?: string;
		keywords?: string;
	};
};

const Article: CollectionConfig = {
	slug: "articles",
	labels: {
		singular: "Artigo",
		plural: "Artigos",
	},
	admin: {
		useAsTitle: "title",
		disableDuplicate: true,
	},
	access: {
		read: (): boolean => true,
	},
	fields: [
		{
			name: "title",
			label: "Título",
			type: "text",
			required: true,
		},
		{
			name: "description",
			label: "Descrição",
			type: "text",
			required: true,
		},
		{
			name: "content",
			label: "Conteúdo",
			type: "richText",
			required: true,
		},
		{
			name: "category",
			label: "Categoria",
			type: "relationship",
			relationTo: "category",
			required: true,
		},
		{
			name: "meta",
			label: "Informações de SEO",
			type: "group",
			fields: [
				{
					name: "title",
					label: "Título do Navegador",
					type: "text",
					admin: {
						description:
							"Conteúdo que ficará visivel na aba do navegador.",
					},
				},
				{
					name: "description",
					label: "Descrição da Página",
					type: "textarea",
					admin: {
						description:
							"Descrição de até 80 caracteres sobre a página. Importante para otimização de buscadores de sites (SEO)",
					},
				},
				{
					name: "keywords",
					label: "Palavras Chaves",
					type: "text",
					admin: {
						description:
							"Algumas palavras chaves da página. Separe por vírgula. Quanto menos genéricas, melhor.",
					},
				},
			],
		},
		{
			name: "status",
			type: "select",
			options: [
				{
					value: "draft",
					label: "Draft",
				},
				{
					value: "published",
					label: "Published",
				},
			],
			defaultValue: "draft",
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "slug",
			label: "slug (gerado automaticamente)",
			type: "text",
			admin: {
				position: "sidebar",
				readOnly: true,
			},
			index: true,
			unique: true,
			hooks: {
				beforeValidate: [formatSlug("title")],
			},
		},
	],
};

export default Article;