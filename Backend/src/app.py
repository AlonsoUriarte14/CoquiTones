from fastapi import FastAPI, staticfiles, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from dbutil import get_db_connection
import psycopg2
import dao

app = FastAPI()
origins = ["http://localhost:3000", "localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/static",
    staticfiles.StaticFiles(directory="../../Frontend/build/static"),
    name="static",
)


@app.get("/", response_class=HTMLResponse)
async def root():
    with open("../../Frontend/build/index.html", "r") as f:
        return f.read()


@app.get("/api/node/all")
async def node(db=Depends(get_db_connection)):
    return dao.Node.get_all(db)
