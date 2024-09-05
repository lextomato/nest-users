# 🗄️ Database for **📦@lextomato/nest-users**

> ✨ _**@lextomato/nest-users** requires a PostgreSQL database to operate correctly. Below is a step-by-step guide on how to set up the necessary database structure for the package to function smoothly._

## 📚 **Table of Contents**

- [Table Structures](#️-table-structures)
- [Primary Keys](#-primary-keys)
- [Unique Constraints](#-unique-constraints)
- [Foreign Keys](#-foreign-keys)
- [Default Sequences](#-default-sequences)
- [Automated Setup](#-instructions-for-setting-up-the-database)

---

## 🗂️ Table Structures

![Database Diagram](/database//diagram.png)

### 1. Table: `public.authentications`

```sql
CREATE TABLE public.authentications (
    "authenticationId" integer NOT NULL,
    "type" character varying(25),
    "secret" character varying(200),
    "active" boolean DEFAULT true,
    "userUuid" character varying(200)
);
```

### 2. Table: `public.passwordRecoveries`

```sql
CREATE TABLE public."passwordRecoveries" (
    "recoveryId" integer NOT NULL,
    "token" character varying(200),
    "createdAt" timestamp without time zone DEFAULT now(),
    "expiresAt" timestamp without time zone,
    "active" boolean DEFAULT true,
    "userUuid" character varying(200)
);
```

### 3. Table: `public.permissions`

```sql
CREATE TABLE public.permissions (
    "permissionId" integer NOT NULL,
    "controller" character varying(200),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "active" boolean DEFAULT true,
    "action" character varying(200),
    "path" character varying(200)
);
```

### 4. Table: `public.rolePermissions`

```sql
CREATE TABLE public."rolePermissions" (
    "rolePermissionsId" integer NOT NULL,
    "roleId" integer,
    "permissionId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "active" boolean DEFAULT true
);
```

### 5. Table: `public.roles`

```sql
CREATE TABLE public.roles (
    "roleId" integer NOT NULL,
    "name" character varying(50),
    "description" character varying(500),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "active" boolean DEFAULT true
);
```

### 6. Table: `public.sessions`

```sql
CREATE TABLE public.sessions (
    "sessionId" integer NOT NULL,
    "token" character varying(200),
    "createdAt" timestamp without time zone DEFAULT now(),
    "expiresAt" timestamp without time zone,
    "ipAddress" character varying(50),
    "userAgent" character varying(200),
    "active" boolean DEFAULT true,
    "userUuid" character varying(200)
);
```

### 7. Table: `public.users`

```sql
CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "userUuid" character varying(200) NOT NULL,
    "name" character varying(200) NOT NULL,
    "lastname" character varying(200) NOT NULL,
    "email" character varying NOT NULL,
    "passwordHash" character varying,
    "roleId" integer DEFAULT 1
);
```

---

## 🔑 Primary Keys

```sql
ALTER TABLE ONLY public.authentications
    ADD CONSTRAINT authentications_pkey PRIMARY KEY ("authenticationId");

ALTER TABLE ONLY public."passwordRecoveries"
    ADD CONSTRAINT "passwordRecoveries_pkey" PRIMARY KEY ("recoveryId");

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY ("permissionId");

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_pkey" PRIMARY KEY ("rolePermissionsId");

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY ("roleId");

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY ("sessionId");

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");
```

---

## 🎯 Unique Constraints

```sql
ALTER TABLE ONLY public."passwordRecoveries"
    ADD CONSTRAINT "passwordRecoveries_token_key" UNIQUE ("token");

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_roleId_permissionId_key" UNIQUE ("roleId", "permissionId");

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE ("name");

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE ("token");

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE ("email");

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_userUuid_key" UNIQUE ("userUuid");
```

---

## 🔗 Foreign Keys

```sql
ALTER TABLE ONLY public.authentications
    ADD CONSTRAINT "authentications_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users("userUuid") NOT VALID;

ALTER TABLE ONLY public."passwordRecoveries"
    ADD CONSTRAINT "passwordRecoveries_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users("userUuid") NOT VALID;

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public.permissions("permissionId");

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles("roleId");

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users("userUuid") NOT VALID;

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles("roleId") NOT VALID;
```

---

## 📜 Default Sequences

```sql
ALTER TABLE ONLY public."passwordRecoveries" ALTER COLUMN "recoveryId" SET DEFAULT nextval('public."passwordRecoveries_recoveryId_seq"'::regclass);
ALTER TABLE ONLY public.permissions ALTER COLUMN "permissionId" SET DEFAULT nextval('public."permissions_permissionId_seq"'::regclass);
ALTER TABLE ONLY public."rolePermissions" ALTER COLUMN "rolePermissionsId" SET DEFAULT nextval('public."rolePermissions_rolePermissionsId_seq"'::regclass);
ALTER TABLE ONLY public.roles ALTER COLUMN "roleId" SET DEFAULT nextval('public."roles_roleId_seq"'::regclass);
ALTER TABLE ONLY public.sessions ALTER COLUMN "sessionId" SET DEFAULT nextval('public."sessions_sessionId_seq"'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);
```

---

## 🚀 Instructions for Setting Up the Database

> ✨ _You can use the `init.sql` script located in the [database/init.sql](/database/init.sql) directory of this repository to automatically create the entire database structure._

### Prerequisites

Before running the `init.sql` script, make sure you have the following:

1. **PostgreSQL installed**: If you don’t have PostgreSQL installed, you can download it from [here](https://www.postgresql.org/download/).
2. **Database created**: Create a new database for your project if you haven’t already. For example:
   ```bash
   createdb my_database
   ```
3. **Access to your database**: Ensure you have the necessary credentials to connect to your database.

### Running the `init.sql` Script

To set up the database with the required structure, follow these steps:

1. **Download the `init.sql` file**: You can find it in the `/database/` directory of this repository or download it from the provided link.
2. **Connect to PostgreSQL**: Use the following command to connect to your database from the terminal or console:

   ```bash
   psql -U <your-username> -d <your-database-name>
   ```

3. **Run the `init.sql` file**: Once connected, execute the script to create the tables and sequences. You can use the following command:

   ```bash
   psql -U <your-username> -d <your-database-name> -f /path/to/init.sql
   ```

   Make sure to replace `/<path/to/init.sql>` with the actual path where the `init.sql` file is located.

4. **Verify the database structure**: Once the script is executed, you can check the created tables by using the command:
   ```sql
   \dt
   ```
   This command will display all the tables created in the database.

### Additional Considerations

- **Custom modifications**: If you need to make changes to the structure before running the script, you can edit the `init.sql` file to suit your needs.
- **Database restoration**: If you already have an existing database and only need to restore the structure, the `init.sql` file will create the necessary tables without deleting existing data.

---

### Complete Example

```bash
psql -U postgres -d my_database -f /documents/init.sql
```

This example will create all tables, sequences, and constraints in the `my_database` database using the `postgres` user.
