export const DBConfig = {
    name: 'UserDB',
    version: 1,
    objectStoresMeta: [
        {
            store: 'user',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'phone', keypath: 'phone', options: { unique: true } },
            ]
        }
    ]
};
