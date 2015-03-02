CREATE TABLE "user"
(
  id serial NOT NULL,
  correo character varying(100),
  password character varying(100),
  created timestamp without time zone DEFAULT now(),
  CONSTRAINT user_pkey PRIMARY KEY (id)
)