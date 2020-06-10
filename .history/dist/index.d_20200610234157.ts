import React from 'react';

declare const stones: unique symbol;

declare class Store implements IStore {
    storeName: string;
    subscribes: SubscribeType[];
    getStoreName(): string;
    update: () => void;
    subscribe: (callback: SubscribeType) => void;
    unsubscribe: (callback: SubscribeType) => void;
}

interface IStore {
    [key: string]: any;
    storeName: string;
    subscribes: SubscribeType[];
    getStoreName: (() => string);
    update: (() => void);
    subscribe: ((args: SubscribeType) => void);
    unsubscribe: ((args: SubscribeType) => void);
}
interface DefaultState {
    [key: string]: any;
}
interface CreateStore {
    getInstances: (() => DefaultStores);
    getState: (() => DefaultState);
}
interface DefaultStores {
    [key: string]: Store;
}
declare type SubscribeType = (() => void);
declare type StoresNames = keyof DefaultStores;
interface IUseStores {
    <T extends DefaultStores, K extends StoresNames>(values?: K): T[K];
    <T extends DefaultStores, K extends StoresNames>(values?: K[]): {
        [P in K]: T[P];
    };
}
interface IGetStores {
    <T extends DefaultStores, K extends StoresNames>(values?: K, stores?: DefaultStores): T[K];
    <T extends DefaultStores, K extends StoresNames>(values?: K[], stores?: DefaultStores): {
        [P in K]: T[P];
    };
}

declare const createStore: (initialState: DefaultState, stores: any[]) => CreateStore;

interface ProviderProps {
    store: any;
    children: any;
}
declare const Provider: (props: ProviderProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;

declare const useStore: IUseStores;

declare const getStores: IGetStores;

declare global {
    interface Window {
        [stones]: DefaultStores;
    }
}

export { Provider, Store, createStore, getStores, useStore };
