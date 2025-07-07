<p align="center">
  <a><img src="../../docs/logo-nest-users.png" width="300" alt="Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nes

![npm](https://img.shields.io/npm/v/@lextomato/nest-users-cli?style=flat-square) ![downloads](https://img.shields.io/npm/dt/@lextomato/nest-users-cli?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

📄 [Documentación en Español](../../packages/cli/README.md)

# 🔧✨ @lextomato/nest‑users‑cli

**Interactive CLI** that scaffolds an **editable NestJS project** with authentication, users, roles and permissions pre‑configured via `@lextomato/nest-users`.

---

## 🚀 Quick start

```bash
npx @lextomato/nest-users-cli init my-app
```

In a few seconds you’ll get:

- Full Nest structure (`src/auth`, `src/users`, …)
- TypeORM + Postgres config out of the box
- Swagger enabled
- `.env.example` with every required variable

---

## 🎛️ Handy flags

| Flag                   | Description                        |
| ---------------------- | ---------------------------------- |
| `--modules auth,users` | Copy only the desired modules      |
| `--pm pnpm`            | Package manager (`npm` is default) |
| `--force`              | Overwrite existing files           |
| `--minimal`            | Skip installing _devDependencies_  |

### Advanced example

```bash
npx nestusers init api --modules auth,users --pm pnpm --minimal
```

---

## 📦 What the template includes

```
my-app/
├─ src/
│  ├─ auth/          # JWT + Google OAuth2
│  ├─ users/         # Users CRUD
│  ├─ roles/         # Role management
│  ├─ permissions/   # Permission management
│  ├─ mail/          # E‑mail service
│  └─ common/        # Filters, guards, pipes, utils
├─ .env.example
└─ nest-cli.json
```

---

## 🧑‍💻 CLI development

```bash
pnpm install          # install devDeps
pnpm run build        # compile to dist/
node bin/run.js init demo
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project from [here](https://github.com/lextomato/nest-users).
2. Create a branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

---

## 🔑 License

This project is licensed under the **MIT License** – see [📄LICENSE](./LICENSE) for details.

---

## 💰 Donations

If you like this project and want to support it, consider a PayPal donation. Your support helps keep the project alive and improving.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/lextomato)

---

### 🔗 Additional resources

- 🛠️ [Issues](https://github.com/lextomato/nest-users/issues) – report problems or suggest improvements.
- 📘 [NestJS documentation](https://docs.nestjs.com) – to learn more about the framework.

---

🚀 **Thanks for using @lextomato/nest-users!** If you have any question or suggestion, feel free to open an issue or contribute.
