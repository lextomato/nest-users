import { Command, Args, Flags } from '@oclif/core';
import prompts from 'prompts';
import { copy, readJSON } from 'fs-extra';
import path from 'path';
const { execa } = require('@esm2cjs/execa');
const chalk = require('chalk');

export default class Init extends Command {
  static description =
    'Generate a NestJS project pre-configured with authentication, users, roles and permissions';

  /* ①  NUEVO flag --minimal  */
  static flags = {
    minimal: Flags.boolean({
      char: 'm',
      description: 'Skip devDependencies installation',
      default: false,
    }),
  };

  static args = {
    name: Args.string({ description: 'Project name', required: false }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse();

    const response = await prompts(
      [
        {
          type: (prev) => (prev ? null : 'text'),
          name: 'name',
          message: 'Project name:',
          initial: 'my-nest-app',
        },
        {
          type: 'multiselect',
          name: 'modules',
          message: 'Select the modules to include:',
          choices: [
            { title: 'auth', value: 'auth', selected: true },
            { title: 'users', value: 'users', selected: true },
            { title: 'roles', value: 'roles', selected: true },
            { title: 'permissions', value: 'permissions', selected: true },
            { title: 'mail', value: 'mail', selected: true },
          ],
        },
        {
          type: 'select',
          name: 'pm',
          message: 'Package manager:',
          choices: [
            { title: 'npm', value: 'npm' },
            { title: 'pnpm', value: 'pnpm', selected: true },
            { title: 'yarn', value: 'yarn' },
          ],
        },
        {
          type: 'confirm',
          name: 'force',
          message: 'Overwrite files if needed?',
          initial: false,
        },
      ],
      {
        onCancel: () => {
          this.log('❌ Cancelled');
          process.exit(1);
        },
      },
    );

    const projectName = args.name || response.name;
    const packageManager = response.pm;
    const modules = response.modules;
    const overwrite = response.force;
    const minimal = flags.minimal;

    /* ---------- LISTAS BASE ---------- */
    const prod = [
      'bcryptjs@^3.0.0',
      'class-transformer@^0.5.1',
      'class-validator@^0.14.1',
      'date-fns@^4.1.0',
      'jsonwebtoken@^9.0.2',
      'nodemailer@^6.10.0',
      'passport@^0.7.0',
      'passport-google-oauth2@^0.2.0',
      'passport-jwt@^4.0.0',
      'pg@^8.13.3',
      'reflect-metadata@^0.2.2',
      'rxjs@^7.8.0',
      'swagger-ui-express@^5.0.1',
      'typeorm@^0.3.0',
      '@lextomato/nest-users',
    ];

    const dev = [
      '@nestjs/cli@^11',
      '@nestjs/typeorm@^11',
      '@nestjs/swagger@^11',
      '@nestjs/passport@^11',
      '@nestjs/config@^4',
      '@nestjs/jwt@^11',
      '@types/bcryptjs@^2.4.6',
      '@types/express@^5',
      '@types/jest@^29',
      '@types/supertest@^6',
      '@typescript-eslint/eslint-plugin@^8.24.0',
      '@typescript-eslint/parser@^8.24.0',
      'eslint@^9',
      'eslint-config-prettier@^10',
      'eslint-plugin-prettier@^5',
      'jest@^29',
      'prettier@^3',
      'rimraf@^6',
      'source-map-support@^0.5',
      'supertest@^7',
      'ts-jest@^29',
      'ts-node@^10',
      'tsconfig-paths@^4',
      'typescript@^5',
    ];

    this.log(chalk.cyan('🔧 Generando proyecto Nest base…'));

    const targetDir = path.resolve(process.cwd(), projectName);
    const templatesDir = path.resolve(__dirname, '../../../templates');

    // 1️⃣ Crear proyecto Nest base
    await execa(
      'npx',
      [
        '@nestjs/cli',
        'new',
        projectName,
        '--skip-git',
        `--package-manager=${packageManager}`,
      ],
      { stdio: 'inherit' },
    );

    // 2️⃣ Copiar plantillas
    this.log(chalk.cyan('📂 Copiando plantillas…'));
    await copy(templatesDir, targetDir, {
      overwrite: overwrite,
      filter: (src) => {
        if (!src.includes('/src/')) return true;
        if (modules.length === 0) return true;
        return modules.some((m: any) => src.includes(`src/${m}`));
      },
    });

    // 3️⃣ filtrar duplicados
    const pkg = await readJSON(path.join(targetDir, 'package.json'));

    const has = (dep: string): boolean =>
      !!(
        pkg.dependencies?.[dep.split('@')[0]] ||
        pkg.devDependencies?.[dep.split('@')[0]]
      );

    const prodToAdd = prod.filter((d) => !has(d));
    const devToAdd = dev.filter((d) => !has(d));

    // 4️⃣ Instalar dependencias core
    const install = async (deps: string[], isDev = false) => {
      if (deps.length === 0) return;
      const cmd = packageManager === 'npm' ? 'install' : 'add';
      const flags = isDev
        ? packageManager === 'npm'
          ? ['--save-dev']
          : ['-D']
        : [];
      this.log(
        chalk.blue(
          `📦 Instalando ${isDev ? 'devDependencies' : 'dependencies'} (${deps.length})…`,
        ),
      );
      await execa(packageManager, [cmd, ...deps, ...flags], {
        cwd: targetDir,
        stdio: 'inherit',
      });
    };

    await install(prodToAdd, false);
    if (!minimal) await install(devToAdd, true);

    this.log(chalk.green('✅ Proyecto listo. ¡Disfruta codificando!'));
  }
}
