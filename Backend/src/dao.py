import psycopg2
from psycopg2 import sql
from psycopg2.extensions import connection
from dataclasses import dataclass
from enum import Enum
from fastapi import HTTPException

node_type = str


class DAO:
    @classmethod
    def get_all(cls, table: str, db: connection) -> list:
        """Get all entities in a list."""
        with db.cursor() as curs:
            try:
                curs.execute(
                    sql.SQL("""
                    SELECT * FROM {}
                    """).format(sql.Identifier(table))
                )
            except psycopg2.Error as e:
                print("Error executing SQL query:", e)
                raise HTTPException(status_code=500, detail="Database error")

            # Unpack the tuples into constructor
            return [cls(*row) for row in curs.fetchall()]


@dataclass
class Node(DAO):
    """Node DAO"""
    nid: int
    ntype: node_type
    nlatitude: float
    nlongitude: float
    ndescription: str

    @classmethod
    def get_all(cls, db: connection):
        return super().get_all('node', db)
