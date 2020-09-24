/// <reference types="react" />
import { FunctionComponent, ReactElement, Context } from 'react';

declare function get<Target>(this: any, target: Target, property: string): void;

interface ObserverStore extends Object {
    [property: string]: any;
    update: () => void;
}

declare function watchStore<Store extends ObserverStore, Args extends object>(target: Store, update: () => void, initial: any, storeArgs?: Args): Store;

declare function set<Target extends ObserverStore>(this: any, target: Target, property: string, value: any): boolean;

declare abstract class Subscribe {
    getList(): Subscribes;
    getUpdate(storeName: string): () => void;
    subscribe(storeName: string, cb: () => void): void;
    unsubscribe(storeName: string, cb: () => void): void;
    update(storeName: string): void;
}
interface Subscribes {
    [key: string]: any[];
}

declare class SubscribeImpl implements Subscribe {
    private subscribes;
    getList(): Subscribes;
    getUpdate(storeName: string): () => void;
    hasStore(storeName: string): boolean;
    subscribe(storeName: string, cb: () => void): void;
    unsubscribe(storeName: string, cb: () => void): void;
    update(storeName: string): void;
}

interface ConnectStores<Stores> {
    <T extends Stores, K extends keyof Stores>(values: K[], Component: any): FunctionComponent;
}

interface StoreCatalog {
    [key: string]: any;
}

declare type DefaultStates = {
    [key: string]: any;
};
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

declare function createStore<State extends DefaultStates, Stores extends DefaultStores, Args extends object>(initialState: State, initialStores: Stores, storeArgs?: Args): CreateStore<State, Stores>;

declare const useStore: PickStores<StoreCatalog>;

declare const connect: ConnectStores<StoreCatalog>;

interface DefaultProps {
    store: any;
    children: any;
}

declare function Provider<ProviderProps extends DefaultProps>(props: ProviderProps): ReactElement;

declare const ReactStoreContext: Context<{
    getState: () => {};
    getStores: () => Partial<StoreCatalog>;
    subscribes: SubscribeImpl;
    useStore: () => {};
}>;

export { ConnectStores, CreateStore, DeclaredStores, DefaultProps, DefaultStates, DefaultStores, ObserverStore, PickStores, Provider, ReactStoreContext, StoreCatalog, Subscribe, SubscribeImpl, Subscribes, connect, createStore, get, set, useStore, watchStore };
