/// <reference types="react" />
import { Subscribe } from 'core/subscribe';
import { FunctionComponent, ReactElement, Context } from 'react';

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

declare type StoreCatalog = {
    [key: string]: any;
};

declare const useStore: PickStores<StoreCatalog>;

interface ConnectStores<Stores> {
    <T extends Stores, K extends keyof Stores>(values: K[], Component: FunctionComponent): FunctionComponent<Pick<T, K>>;
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
    subscribes: Subscribe;
}>;

export { ConnectStores, CreateStore, DeclaredStores, DefaultProps, DefaultStores, PickStores, Provider, ReactStoreContext, StoreCatalog, connect, createStore, useStore };
