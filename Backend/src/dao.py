import psycopg2
from psycopg2 import sql
from psycopg2.extensions import connection
from dataclasses import dataclass
from datetime import datetime
from fastapi import HTTPException

node_type = str


class DAO:
    @classmethod
    def get_all(cls, db: connection) -> list:
        """Get all entities in a list."""
        with db.cursor() as curs:
            try:
                curs.execute(
                    sql.SQL("""
                    SELECT * FROM {}
                    """).format(sql.Identifier(cls.table))
                )
            except psycopg2.Error as e:
                print("Error executing SQL query:", e)
                raise HTTPException(status_code=500, detail="Database error")

            # Unpack the tuples into constructor
            return [cls(*row) for row in curs.fetchall()]

    @classmethod
    def get(cls, id: int, db: connection) -> list:
        """Get one entity by its ID."""
        with db.cursor() as curs:
            try:
                curs.execute(
                    sql.SQL("""
                    SELECT * FROM {}
                    WHERE {} = %s
                    """).format(sql.Identifier(cls.table), sql.Identifier(cls.id_column)), (id,)
                )
            except psycopg2.Error as e:
                print("Error executing SQL query:", e)
                raise HTTPException(status_code=500, detail="Database error")

            # Unpack the tuple into constructor
            return cls(*curs.fetchone())


@dataclass
class Node(DAO):
    """Node DAO"""
    nid: int
    ntype: node_type
    nlatitude: float
    nlongitude: float
    ndescription: str

    table = "node"
    id_column = "nid"


@dataclass
class TimestampIndex(DAO):
    """Timestamp index DAO"""
    tid: int
    nid: int
    ttime: datetime

    table = "timestampindex"
    id_column = "tid"


@dataclass
class ClassifierReport(DAO):
    """Classifier report DAO"""
    crid: int
    tid: int
    crsamples: int
    crcoqui: int
    crantillensis: int
    crcochranae: int
    cre_monensis: int
    crgryllus: int
    crhedricki: int
    crlocustus: int
    crportoricensis: int
    crrichmondi: int
    crwightmanae: int
    crno_hit: int

    table = "classifierreport"
    id_column = "crid"


@dataclass
class WeatherData(DAO):
    """Weather Data DAO"""
    wdid: int
    tid: int
    wdtemperature: float
    wdhumidity: float
    wdpressure: float
    wddid_rain: bool

    table = "weatherdata"
    id_colummn = "wdid"


@dataclass
class AudioFile(DAO):
    """Audio File DAO"""
    afid: int
    tid: int
    data: bytes

    table = "audiofile"
    id_column = "afid"

    @classmethod
    def get_all(cls, db: connection) -> list:
        """Get IDs of audio files, but not audio"""
        with db.cursor() as curs:
            try:
                curs.execute(
                    """
                    SELECT afid, tid
                    FROM audiofile
                    """
                )
            except psycopg2.Error as e:
                print("Error executing SQL query:", e)
                raise HTTPException(status_code=500, detail="Database error")

            # Not pulling the audio data.
            return [cls(row[0], row[1], None) for row in curs.fetchall()]
