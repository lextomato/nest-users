<p align="center">
  <a><img src="./docs/logo-nest-users.png" width="300" alt="Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nes

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

📄 [Documentation in English](/docs/en/README.md)

> ✨ _**@lextomato/nest-users** es una solución integral y lista para usar que simplifica la implementación de autenticación, gestión de usuarios, control de roles y permisos en tus proyectos **NestJS**. Con este paquete, podrás manejar de forma segura y eficiente todo el ciclo de autenticación (incluyendo **login**, **logout**, **register**, **login/register con google**, **cambio de contraseña**, y **recuperación de contraseñas olvidadas**), mientras que también te permite gestionar **usuarios**, **roles**, y **permisos** a través de un completo sistema de **CRUD**._

> ✨ _Además, proporciona un robusto sistema de **Control de Acceso** que garantiza que cada endpoint de **tu aplicación solo sea accesible por usuarios con los permisos adecuados**, basados en los roles asignados. Perfecto para aplicaciones que requieren un control de acceso detallado y una administración centralizada de usuarios._

# 🧰✨ Nest Users Kit

Monorepo que reúne **todo lo que necesitas** para añadir autenticación, usuarios, roles y permisos a tus APIs **NestJS** en cuestión de minutos.

| 📦 Paquete                    | 🚀 Última versión                                                                    | 🔍 Descripción                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **@lextomato/nest‑users**     | ![npm](https://img.shields.io/npm/v/@lextomato/nest-users.svg?color=brightgreen)     | Librería “caja‑negra” (solo `dist/`) con módulos listos para importar. |
| **@lextomato/nest‑users‑cli** | ![npm](https://img.shields.io/npm/v/@lextomato/nest-users-cli.svg?color=brightgreen) | CLI 🧙‍♂️ que genera un proyecto Nest editable con dichos módulos.        |

---

## ⚡️ Prueba rápida

```bash
# 🏗️ Generar proyecto con todo configurado
npx @lextomato/nest-users-cli init my-app
cd my-app
npm run start:dev
```

```bash
# 📚 Solo la librería para integrarla en un proyecto propio
npm i @lextomato/nest-users
```

> 👉 **Swagger online demo:** https://lextomato.github.io/nest-users-swagger-ui/

---

## 📂 Estructura del repo

```
.
├─ packages/
│  ├─ core/   # → @lextomato/nest-users
│  └─ cli/    # → @lextomato/nest-users-cli
└─ docs/      # diagramas, assets…
```

- 📖 **Documentación completa del core:** [Documentation](packages/core/README.md)
- 🖥️ **Guía detallada de la CLI:** [README](packages/cli/README.md)

---

## 🧑‍💻 **Contribuciones**

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Haz un fork del proyecto desde [aquí](https://github.com/lextomato/nest-users).
2. Crea una nueva rama (`git checkout -b feature/new-function`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva función'`).
4. Haz push a la rama (`git push origin feature/new-function`).
5. Crea un nuevo Pull Request.

---

## 🔑 **Licencia**

Este proyecto está licenciado bajo la Licencia **MIT** - consulta el archivo [📄LICENSE](./LICENSE) para más detalles.

---

## 💰 **Donaciones**

Si te gusta este proyecto y te gustaría apoyarlo, considera hacer una donación vía PayPal. Tu apoyo ayuda a mantener este proyecto y mejorar sus funcionalidades.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

---

### 🔗 **Recursos Adicionales**

- 🛠️ [Issues](https://github.com/lextomato/nest-users/issues) _(Link a la página de Issues para reportar problemas o sugerir mejoras)._
- 📘 [Documentación de NestJS](https://docs.nestjs.com) _(Para obtener más información sobre cómo funciona NestJS)._

---

🚀 ¡Gracias por usar **@lextomato/nest-users** Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contribuir al proyecto.
