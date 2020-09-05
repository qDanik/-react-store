import { ReactElement } from 'react';

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
export interface DefaultStores {
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
interface IGetStoresFromComponent {
    <T extends DefaultStores, K extends StoresNames>(values?: K): T[K];
    <T extends DefaultStores, K extends StoresNames>(values?: K[]): {
        [P in K]: T[P];
    };
}

declare const createStore: (initialState: DefaultState, stores: any[], storeArgs: any[]) => CreateStore;

declare const useStore: IUseStores;

declare const getStoresFromComponent: IGetStoresFromComponent;

interface ProviderProps {
    store: any;
    children: any;
}
declare const Provider: (props: ProviderProps) => ReactElement;

declare global {
    interface Window {
        [stones]: DefaultStores;
    }
}

export { Provider, Store, createStore, getStoresFromComponent as getStores, useStore };
