import psycopg2
from psycopg2.extensions import connection
from dataclasses import dataclass
from enum import Enum 
from fastapi import HTTPException

node_type = str

@dataclass
class Node:
    """Node DAO"""
    nid: int
    ntype: node_type
    nlatitude: float
    nlongitude: float
    ndescription: str

    @staticmethod
    def get_all(db: connection):
        """Get all nodes in a list."""
        with db.cursor() as curs:
            try:
                curs.execute(
                    """
                    SELECT * FROM node
                    """
                )
            except psycopg2.Error as e:
                print("Error executing SQL query:", e)
                raise HTTPException(status_code=500, detail="Database error")

            return [Node(*row) for row in curs.fetchall()]  # Unpack the tuples into constructor
