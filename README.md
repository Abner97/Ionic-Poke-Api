# Aplicación de Pokémon con LaunchDarkly

**Instalación del proyecto**

    $ npm install
    $ ionic serve

## LaunchDarkly

Instalar LaunchDarkly en el proyecto (SDK para JS):

```shell
$ npm install --save launchdarkly-js-client-sdk
```

    import * as LDClient from "launchdarkly-js-client-sdk";
    

- Crear una cuenta en [LaunchDarkly](https://launchdarkly.com/).
- Crear las flags que desee utilizar en la app. (leer el documento de Jira para conocer más).
- Para modificar el servicio de LaunchDarkly debe editar el archivo **_launchdarkly.service.ts_** que se encuentra en la ruta : /src/app/services/
  - Lo primero es cambiar el SDK Key por el de tu proyecto Configcat:

```js
initialize() {
    //Objeto user
    this.user = {
      key: "uhdj56",
      email: "correo@corre.com",
      country: "USA",
      custom: {
        platform: this.platformService.getPlatformName(),
        company: "BG",
        department: "QA",
      },
    };
    //Inicializacion del cliente y seteo del storage que queremos que use el cliente
    this.ldClient = LDClient.initialize("5ff5da42a793ec0abb9f7267", this.user, {
      bootstrap: "localStorage",
    });
  }
```

- Ya lo que queda por hacer es apuntar hacia las flags de tu proyecto como se indica en el doc de Jira.


