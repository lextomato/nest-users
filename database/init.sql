CREATE SEQUENCE public."authentications_authenticationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.authentications (
    "authenticationId" integer DEFAULT nextval('public."authentications_authenticationId_seq"'::regclass) NOT NULL,
    "type" character varying(25),
    "secret" character varying(200),
    "active" boolean DEFAULT true,
    "userUuid" character varying(200)
);

CREATE SEQUENCE public."passwordRecoveries_recoveryId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public."passwordRecoveries" (
    "recoveryId" integer NOT NULL,
    "token" character varying(200),
    "createdAt" timestamp without time zone DEFAULT now(),
    "expiresAt" timestamp without time zone,
    "active" boolean DEFAULT true,
    "userUuid" character varying(200)
);

CREATE SEQUENCE public."permissions_permissionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.permissions (
    "permissionId" integer DEFAULT nextval('public."permissions_permissionId_seq"'::regclass) NOT NULL,
    "controller" character varying(200),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "active" boolean DEFAULT true,
    "action" character varying(200),
    "path" character varying(200)
);

CREATE SEQUENCE public."rolePermissions_rolePermissionsId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public."rolePermissions" (
    "rolePermissionsId" integer DEFAULT nextval('public."rolePermissions_rolePermissionsId_seq"'::regclass) NOT NULL,
    "roleId" integer,
    "permissionId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "active" boolean DEFAULT true
);

CREATE SEQUENCE public."roles_roleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.roles (
    "roleId" integer DEFAULT nextval('public."roles_roleId_seq"'::regclass) NOT NULL,
    "name" character varying(50),
    "description" character varying(500),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "active" boolean DEFAULT true
);

CREATE SEQUENCE public."sessions_sessionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.sessions (
    "sessionId" integer DEFAULT nextval('public."sessions_sessionId_seq"'::regclass) NOT NULL,
    "token" character varying(200),
    "createdAt" timestamp without time zone DEFAULT now(),
    "expiresAt" timestamp without time zone,
    "ipAddress" character varying(50),
    "userAgent" character varying(200),
    "active" boolean DEFAULT true,
    "userUuid" character varying(200)
);

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.users (
    "userId" integer DEFAULT nextval('public."users_userId_seq"'::regclass) NOT NULL,
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

-- Foreign Keys
ALTER TABLE ONLY public.authentications
ADD CONSTRAINT "authentications_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users ("userUuid");

ALTER TABLE ONLY public."passwordRecoveries"
    ADD CONSTRAINT "passwordRecoveries_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users("userUuid");

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public.permissions("permissionId");

ALTER TABLE ONLY public."rolePermissions"
    ADD CONSTRAINT "rolePermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles("roleId");

ALTER TABLE ONLY public.sessions
ADD CONSTRAINT "sessions_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users ("userUuid");

ALTER TABLE ONLY public.users
ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles ("roleId");