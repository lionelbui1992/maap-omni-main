# maap-omni
 MAAP Experience Applications.

### Installation and package setup: PNPM

Install all package using: `pnpm install`

To add new package: `pnpm add -w <package>`

Update all package using: `pnpm update <package>`

Uninstall a package using: `pnpm uninstall <package`

### Develop:
To develop all apps and packages, run the following command:

To start the terminal: `turbo run dev` or `pnpm run dev`

To start slice machine in local: `pnpm slicemachine` 

### Troubleshooting:
If storybook fails to start or throws an error relating to missing dependencies, check your version of pnpm. A version of at least `8.6.7` is required.
