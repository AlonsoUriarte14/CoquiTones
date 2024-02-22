from fastapi import FastAPI, staticfiles, Depends, HTTPException
from fastapi.responses import HTMLResponse
from dbutil import get_db_connection
import psycopg2
import dao

app = FastAPI()

app.mount("/static", staticfiles.StaticFiles(directory="../../Frontend/build/static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def root():
    with open("../../Frontend/build/index.html", "r") as f:
        return f.read()
    
@app.get("/api/node/all")
async def node(db = Depends(get_db_connection)):
    return dao.Node.get_all(db)
