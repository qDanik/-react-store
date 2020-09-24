import React, {Component} from 'react';
import {StoreCatalog, useStore} from '../useStore';
import {ConnectStores} from './interfaces';

export const connect: ConnectStores<StoreCatalog> = (values: any, Component: any): any => {
  function Connect(props: any) {
    const stores = useStore(values);

    return (
      <Component {...props} {...stores} />
    )
  }

  Connect.displayName = `connect(${Component.name})`

  return Connect;
}
