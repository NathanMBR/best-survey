# vitest-environment-integration

This folder defines the integration tests environment for Vitest.

Similar with Jest, it exports an environment that can be used by the integration tests to setup a clear database schema.
However, Vitest uses a different search strategy: it looks for a `package.json` file inside a `vitest-environment-*` folder in the project root.

**_PLEASE, DO NOT CHANGE OR MOVE THIS DIRECTORY OR ANY CONTENT INSIDE IT, UNLESS YOU KNOW WHAT YOU'RE DOING._**
