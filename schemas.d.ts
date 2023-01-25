import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  UIDAttribute,
  TextAttribute,
  SetPluginOptions,
  SingleTypeSchema,
  DynamicZoneAttribute,
  MediaAttribute,
  ComponentAttribute,
  RichTextAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginNavigationAudience extends CollectionTypeSchema {
  info: {
    singularName: 'audience';
    pluralName: 'audiences';
    displayName: 'Audience';
    name: 'audience';
  };
  options: {
    increments: true;
    comment: 'Audience';
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    key: UIDAttribute<'plugin::navigation.audience', 'name'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::navigation.audience',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::navigation.audience',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginNavigationNavigation extends CollectionTypeSchema {
  info: {
    singularName: 'navigation';
    pluralName: 'navigations';
    displayName: 'Navigation';
    name: 'navigation';
  };
  options: {
    increments: true;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: TextAttribute & RequiredAttribute;
    slug: UIDAttribute & RequiredAttribute;
    visible: BooleanAttribute & DefaultTo<false>;
    items: RelationAttribute<
      'plugin::navigation.navigation',
      'oneToMany',
      'plugin::navigation.navigation-item'
    >;
    localizations: RelationAttribute<
      'plugin::navigation.navigation',
      'oneToMany',
      'plugin::navigation.navigation'
    >;
    localeCode: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::navigation.navigation',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::navigation.navigation',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginNavigationNavigationItem extends CollectionTypeSchema {
  info: {
    singularName: 'navigation-item';
    pluralName: 'navigation-items';
    displayName: 'Navigation Item';
    name: 'navigation-item';
  };
  options: {
    increments: true;
    timestamps: true;
    comment: 'Navigation Item';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    title: TextAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    type: EnumerationAttribute<['INTERNAL', 'EXTERNAL', 'WRAPPER']> &
      DefaultTo<'INTERNAL'>;
    path: TextAttribute;
    externalPath: TextAttribute;
    uiRouterKey: StringAttribute;
    menuAttached: BooleanAttribute & DefaultTo<false>;
    order: IntegerAttribute & DefaultTo<0>;
    collapsed: BooleanAttribute & DefaultTo<false>;
    related: RelationAttribute<
      'plugin::navigation.navigation-item',
      'oneToOne',
      'plugin::navigation.navigations-items-related'
    >;
    parent: RelationAttribute<
      'plugin::navigation.navigation-item',
      'oneToOne',
      'plugin::navigation.navigation-item'
    >;
    master: RelationAttribute<
      'plugin::navigation.navigation-item',
      'manyToOne',
      'plugin::navigation.navigation'
    >;
    audience: RelationAttribute<
      'plugin::navigation.navigation-item',
      'oneToMany',
      'plugin::navigation.audience'
    >;
    additionalFields: JSONAttribute & DefaultTo<{}>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::navigation.navigation-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::navigation.navigation-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginNavigationNavigationsItemsRelated
  extends CollectionTypeSchema {
  info: {
    singularName: 'navigations-items-related';
    pluralName: 'navigations-items-relateds';
    displayName: 'Navigations Items Related';
    name: 'navigations_items_related';
  };
  options: {
    increments: true;
    timestamps: false;
    populateCreatorFields: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    related_id: StringAttribute & RequiredAttribute;
    related_type: StringAttribute & RequiredAttribute;
    field: StringAttribute & RequiredAttribute;
    order: IntegerAttribute & RequiredAttribute;
    master: StringAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::navigation.navigations-items-related',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::navigation.navigations-items-related',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAboutAbout extends SingleTypeSchema {
  info: {
    singularName: 'about';
    pluralName: 'abouts';
    displayName: 'About';
    description: 'Write about yourself and the content you create';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute;
    blocks: DynamicZoneAttribute<
      ['shared.media', 'shared.quote', 'shared.rich-text', 'shared.slider']
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::about.about',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::about.about',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiArticleArticle extends CollectionTypeSchema {
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: 'Create your blog content';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      SetMinMaxLength<{
        maxLength: 80;
      }>;
    slug: UIDAttribute<'api::article.article', 'title'>;
    cover: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    author: RelationAttribute<
      'api::article.article',
      'manyToOne',
      'api::author.author'
    >;
    category: RelationAttribute<
      'api::article.article',
      'manyToOne',
      'api::category.category'
    >;
    blocks: DynamicZoneAttribute<
      ['shared.media', 'shared.quote', 'shared.rich-text', 'shared.slider']
    > &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::article.article',
      'oneToMany',
      'api::article.article'
    >;
    locale: StringAttribute;
  };
}

export interface ApiAuthorAuthor extends CollectionTypeSchema {
  info: {
    singularName: 'author';
    pluralName: 'authors';
    displayName: 'Author';
    description: 'Create authors for your content';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute;
    avatar: MediaAttribute;
    email: StringAttribute;
    articles: RelationAttribute<
      'api::author.author',
      'oneToMany',
      'api::article.article'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCategoryCategory extends CollectionTypeSchema {
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: 'Organize your content into categories';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute;
    slug: UIDAttribute;
    articles: RelationAttribute<
      'api::category.category',
      'oneToMany',
      'api::article.article'
    >;
    description: TextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiGlobalGlobal extends SingleTypeSchema {
  info: {
    singularName: 'global';
    pluralName: 'globals';
    displayName: 'Global';
    description: 'Define global settings';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    siteName: StringAttribute & RequiredAttribute;
    favicon: MediaAttribute;
    siteDescription: TextAttribute & RequiredAttribute;
    defaultSeo: ComponentAttribute<'shared.seo'>;
    socials: RelationAttribute<
      'api::global.global',
      'oneToMany',
      'api::social.social'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiHomePageHomePage extends SingleTypeSchema {
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'HomePage';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Sections: DynamicZoneAttribute<
      [
        'sections.our-services',
        'sections.slider-with-hot-post',
        'sections.partner-slide',
        'sections.contact',
        'sections.article-slide',
        'sections.fifty-fifty-dark'
      ]
    > &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::home-page.home-page',
      'oneToMany',
      'api::home-page.home-page'
    >;
    locale: StringAttribute;
  };
}

export interface ApiLinkLink extends CollectionTypeSchema {
  info: {
    singularName: 'link';
    pluralName: 'links';
    displayName: 'Link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    isExternal: BooleanAttribute & DefaultTo<false>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::link.link', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::link.link', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiLinkArticleLinkArticle extends CollectionTypeSchema {
  info: {
    singularName: 'link-article';
    pluralName: 'link-articles';
    displayName: 'Link Article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    alt: StringAttribute;
    article: RelationAttribute<
      'api::link-article.link-article',
      'oneToOne',
      'api::article.article'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::link-article.link-article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::link-article.link-article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiLinkExternalLinkExternal extends CollectionTypeSchema {
  info: {
    singularName: 'link-external';
    pluralName: 'link-externals';
    displayName: 'Link External';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute;
    href: StringAttribute;
    alt: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::link-external.link-external',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::link-external.link-external',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPagePage extends CollectionTypeSchema {
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    blocks: DynamicZoneAttribute<
      [
        'shared.media',
        'shared.quote',
        'shared.rich-text',
        'shared.slider-item',
        'shared.slider'
      ]
    > &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    seo: ComponentAttribute<'shared.seo'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: UIDAttribute<'api::page.page', 'name'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    intro: ComponentAttribute<'sections.intro'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::page.page', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::page.page', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::page.page',
      'oneToMany',
      'api::page.page'
    >;
    locale: StringAttribute;
  };
}

export interface ApiPartnerPartner extends CollectionTypeSchema {
  info: {
    singularName: 'partner';
    pluralName: 'partners';
    displayName: 'Partner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    logo: MediaAttribute;
    description: TextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiRequestContactRequestContact extends CollectionTypeSchema {
  info: {
    singularName: 'request-contact';
    pluralName: 'request-contacts';
    displayName: 'Request Contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    email: EmailAttribute;
    phone: StringAttribute;
    description: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::request-contact.request-contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::request-contact.request-contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiServiceService extends CollectionTypeSchema {
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    logo: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::service.service',
      'oneToMany',
      'api::service.service'
    >;
    locale: StringAttribute;
  };
}

export interface ApiSocialSocial extends CollectionTypeSchema {
  info: {
    singularName: 'social';
    pluralName: 'socials';
    displayName: 'Social';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    description: TextAttribute;
    icon: MediaAttribute;
    link: TextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::social.social',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::social.social',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface SectionsArticleSlide extends ComponentSchema {
  info: {
    displayName: 'Article slide';
    description: '';
  };
  attributes: {
    name: StringAttribute;
    articles: RelationAttribute<
      'sections.article-slide',
      'oneToMany',
      'api::article.article'
    >;
    isDark: BooleanAttribute;
  };
}

export interface SectionsContact extends ComponentSchema {
  info: {
    displayName: 'Contact';
  };
  attributes: {
    name: StringAttribute;
    image: MediaAttribute;
  };
}

export interface SectionsFiftyFiftyDark extends ComponentSchema {
  info: {
    displayName: 'fifty-fifty-dark';
    description: '';
  };
  attributes: {
    name: StringAttribute;
    article: RelationAttribute<
      'sections.fifty-fifty-dark',
      'oneToOne',
      'api::article.article'
    >;
    description: RichTextAttribute;
    image: MediaAttribute;
  };
}

export interface SectionsIntro extends ComponentSchema {
  info: {
    displayName: 'Intro';
  };
  attributes: {
    name: StringAttribute;
    description: RichTextAttribute;
  };
}

export interface SectionsOurServices extends ComponentSchema {
  info: {
    displayName: 'Our services';
    description: '';
  };
  attributes: {
    services: RelationAttribute<
      'sections.our-services',
      'oneToMany',
      'api::service.service'
    >;
    name: StringAttribute;
  };
}

export interface SectionsPartnerSlide extends ComponentSchema {
  info: {
    displayName: 'Partner slide';
    description: '';
  };
  attributes: {
    name: StringAttribute;
    partners: RelationAttribute<
      'sections.partner-slide',
      'oneToMany',
      'api::partner.partner'
    >;
  };
}

export interface SectionsSliderWithHotPost extends ComponentSchema {
  info: {
    displayName: 'Slider with hot post';
    description: '';
  };
  attributes: {
    sliders: ComponentAttribute<'shared.slider-item', true>;
    articles: RelationAttribute<
      'sections.slider-with-hot-post',
      'oneToMany',
      'api::article.article'
    >;
  };
}

export interface SharedMedia extends ComponentSchema {
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: MediaAttribute;
  };
}

export interface SharedMetaSocial extends ComponentSchema {
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
    description: '';
  };
  attributes: {
    socialNetwork: EnumerationAttribute<['Facebook', 'Twitter']> &
      RequiredAttribute;
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: MediaAttribute;
  };
}

export interface SharedQuote extends ComponentSchema {
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: StringAttribute;
    body: TextAttribute;
  };
}

export interface SharedRichText extends ComponentSchema {
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: RichTextAttribute;
    image: MediaAttribute;
  };
}

export interface SharedSeo extends ComponentSchema {
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: StringAttribute & RequiredAttribute;
    metaDescription: TextAttribute & RequiredAttribute;
    shareImage: MediaAttribute;
    metaSocial: ComponentAttribute<'shared.meta-social', true>;
    keywords: TextAttribute;
    metaRobots: StringAttribute;
    structuredData: JSONAttribute;
    metaViewport: StringAttribute;
    canonicalURL: StringAttribute;
  };
}

export interface SharedSliderItem extends ComponentSchema {
  info: {
    displayName: 'SliderItem';
    description: '';
  };
  attributes: {
    content: TextAttribute;
    image: MediaAttribute;
    name: StringAttribute;
  };
}

export interface SharedSlider extends ComponentSchema {
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: MediaAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::navigation.audience': PluginNavigationAudience;
      'plugin::navigation.navigation': PluginNavigationNavigation;
      'plugin::navigation.navigation-item': PluginNavigationNavigationItem;
      'plugin::navigation.navigations-items-related': PluginNavigationNavigationsItemsRelated;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::about.about': ApiAboutAbout;
      'api::article.article': ApiArticleArticle;
      'api::author.author': ApiAuthorAuthor;
      'api::category.category': ApiCategoryCategory;
      'api::global.global': ApiGlobalGlobal;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::link.link': ApiLinkLink;
      'api::link-article.link-article': ApiLinkArticleLinkArticle;
      'api::link-external.link-external': ApiLinkExternalLinkExternal;
      'api::page.page': ApiPagePage;
      'api::partner.partner': ApiPartnerPartner;
      'api::request-contact.request-contact': ApiRequestContactRequestContact;
      'api::service.service': ApiServiceService;
      'api::social.social': ApiSocialSocial;
      'sections.article-slide': SectionsArticleSlide;
      'sections.contact': SectionsContact;
      'sections.fifty-fifty-dark': SectionsFiftyFiftyDark;
      'sections.intro': SectionsIntro;
      'sections.our-services': SectionsOurServices;
      'sections.partner-slide': SectionsPartnerSlide;
      'sections.slider-with-hot-post': SectionsSliderWithHotPost;
      'shared.media': SharedMedia;
      'shared.meta-social': SharedMetaSocial;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider-item': SharedSliderItem;
      'shared.slider': SharedSlider;
    }
  }
}
