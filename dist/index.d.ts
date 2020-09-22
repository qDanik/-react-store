
declare module '@reactt/store' {
    /// <reference types="react" />
    import { ReactElement, Context } from 'react';

    type DefaultStores = {
        [key: string]: any;
    };
    type DeclaredStores<Stores> = {
        [key: string]: Stores;
    };
    interface CreateStore<State, Stores> {
        getStores: (() => Stores);
        getState: (() => State);
        useStore: PickStores<Stores>;
    }
    interface PickStores<Stores> {
        <T extends Stores, K extends keyof Stores>(values?: K): T[K];
        <T extends Stores, K extends keyof Stores>(values?: K[]): Pick<T, K>;
    }

    function createStore<State, Stores extends DefaultStores, Args extends any[]>(initialState: State, initialStores: Stores, storeArgs?: Args): CreateStore<State, Stores>;

    interface DefaultProps {
        store: any;
        children: any;
    }

    function Provider<ProviderProps extends DefaultProps>(props: ProviderProps): ReactElement;

    type StoreCatalog = {
        [key: string]: any;
    };

    const useStore: PickStores<StoreCatalog>;


    const ReactStoreContext: Context<{
        getStores: () => never[];
        getState: () => void;
        useStore: () => void;
    }>;

    export { CreateStore, DeclaredStores, DefaultProps, DefaultStores, PickStores, Provider, ReactStoreContext, StoreCatalog, createStore, useStore };
}
