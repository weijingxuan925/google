import { libraryInit, libraryLoad, libraryUpdate } from './library.js';

const path = '/Library';

(async function () {
  let lib;
  try {
    lib = await library.libraryLoad(path);
  } catch (err) {
    await library.libraryInit(path);
    lib = await library.libraryLoad(path);
  }

  lib = await library.libraryUpdate(lib, path);
})();
