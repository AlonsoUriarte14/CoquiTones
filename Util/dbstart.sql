DROP TYPE IF EXISTS node_type;
DROP TABLE IF EXISTS node;
DROP TABLE IF EXISTS timestampindex;
DROP TABLE IF EXISTS audiofile;
DROP TABLE IF EXISTS weatherdata;
DROP TABLE IF EXISTS classifierreport;

CREATE TYPE node_type AS ENUM ('primary', 'secondary');

CREATE TABLE node (
    nid         SERIAL PRIMARY KEY,
    ntype       node_type NOT NULL,
    nlatitude   REAL NOT NULL,
    nlongitude  REAL NOT NULL,
    ndescription VARCHAR(512)
);

CREATE TABLE timestampindex (
    tid         SERIAL PRIMARY KEY,
    nid         INTEGER REFERENCES node,
    ttime       TIME NOT NULL
);

CREATE TABLE classifierreport (
    crid                SERIAL PRIMARY KEY,
    tid                 INTEGER REFERENCES timestampindex,
    crsamples           INTEGER NOT NULL,
    crcoqui_common      INTEGER NOT NULL,
    crcoqui_e_monensis  INTEGER NOT NULL,
    crcoqui_antillensis INTEGER NOT NULL,
    crno_hit            INTEGER NOT NULL
);

CREATE TABLE audiofile (
    afid        SERIAL PRIMARY KEY,
    tid         INTEGER REFERENCES  timestampindex,
    data        pg_largeobject NOT NULL
);

CREATE TABLE weatherdata (
    wdid            SERIAL PRIMARY KEY,
    tid             INTEGER REFERENCES timestampindex,
    wdtemperature   REAL,
    wdhumidity      REAL,
    wdpressure      REAL,
    wddid_rain      bool
);