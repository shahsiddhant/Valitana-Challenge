import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'articles',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        {
          name: 'publishedOn',
          keypath: 'publishedOn',
          options: { unique: false },
        },
        {
          name: 'lastUpdated',
          keypath: 'lastUpdated',
          options: { unique: false },
        },
        {
          name: 'body',
          keypath: 'body',
          options: { unique: false },
        },
      ],
    },
  ],
};
