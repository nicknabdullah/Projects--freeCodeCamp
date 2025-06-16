--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    username character varying(22) NOT NULL,
    games_played integer NOT NULL,
    best_game integer
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES ('r', 1, 2);
INSERT INTO public.users VALUES ('user_1750086473506', 2, 2);
INSERT INTO public.users VALUES ('user_1750093831833', 2, 3);
INSERT INTO public.users VALUES ('user_1750086473507', 5, 1);
INSERT INTO public.users VALUES ('user_1750093831834', 5, 2);
INSERT INTO public.users VALUES ('user_1750086495459', 2, 2);
INSERT INTO public.users VALUES ('user_1750086495460', 5, 2);
INSERT INTO public.users VALUES ('user_1750094179810', 2, 286);
INSERT INTO public.users VALUES ('user_1750086592773', 2, 4);
INSERT INTO public.users VALUES ('user_1750094179811', 5, 275);
INSERT INTO public.users VALUES ('user_1750086592774', 5, 2);
INSERT INTO public.users VALUES ('user_1750093509228', 2, 2);
INSERT INTO public.users VALUES ('user_1750093509229', 5, 2);
INSERT INTO public.users VALUES ('user_1750093566111', 2, 4);
INSERT INTO public.users VALUES ('user_1750093566112', 5, 2);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--

