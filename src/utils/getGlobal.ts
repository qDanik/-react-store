const getGlobal = (): Window | any => {
  const __window = typeof window !== 'undefined' && window;
  const __global = typeof globalThis !== 'undefined' && globalThis;

  return __global || __window;
}

export default getGlobal;
