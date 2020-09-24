/// <reference types="react" />
import { FunctionComponent, ReactElement, Context } from 'react';

declare function get<Target>(this: any, target: Target, property: string): void;

interface ObserverStore extends Object {
    [property: string]: any;
    update: () => void;
}

declare function Observer<Store extends ObserverStore, Args extends object>(target: Store, update: () => void, storeArgs?: Args): Store;

declare function set<Target extends ObserverStore>(this: any, target: Target, property: string, value: any): boolean;

declare abstract class Subscribe {
    getUpdate(storeName: string): () => void;
    update(storeName: string): void;
    subscribe(storeName: string, cb: () => void): void;
    unsubscribe(storeName: string, cb: () => void): void;
}
interface Subscribes {
    [key: string]: any[];
}

declare class SubscribeImpl implements Subscribe {
    private subscribes;
    hasStore(storeName: string): boolean;
    getUpdate(storeName: string): () => void;
    update(storeName: string): void;
    subscribe(storeName: string, cb: () => void): void;
    unsubscribe(storeName: string, cb: () => void): void;
}

declare type DefaultStores = {
    [key: string]: any;
};
declare type DeclaredStores<Stores> = {
    [key: string]: Stores;
};
interface CreateStore<State, Stores> {
    getStores: (() => Stores);
    getState: (() => State);
    useStore: PickStores<Stores>;
    subscribes: Subscribe;
}
interface PickStores<Stores> {
    <T extends Stores, K extends keyof Stores>(values?: K): T[K];
    <T extends Stores, K extends keyof Stores>(values?: K[]): Pick<T, K>;
}

declare function createStore<State, Stores extends DefaultStores, Args extends object>(initialState: State, initialStores: Stores, storeArgs?: Args): CreateStore<State, Stores>;

interface StoreCatalog {
    [key: string]: any;
}

declare const useStore: PickStores<StoreCatalog>;

interface ConnectStores<Stores> {
    <T extends Stores, K extends keyof Stores>(values: K[], Component: FunctionComponent<Pick<T, K>>): FunctionComponent;
}

declare const connect: ConnectStores<StoreCatalog>;

interface DefaultProps {
    store: any;
    children: any;
}

declare function Provider<ProviderProps extends DefaultProps>(props: ProviderProps): ReactElement;

declare const ReactStoreContext: Context<{
    getStores: () => Partial<StoreCatalog>;
    getState: () => {};
    useStore: () => {};
    subscribes: SubscribeImpl;
}>;

export { ConnectStores, CreateStore, DeclaredStores, DefaultProps, DefaultStores, Observer, ObserverStore, PickStores, Provider, ReactStoreContext, StoreCatalog, Subscribe, SubscribeImpl, Subscribes, connect, createStore, get, set, useStore };
