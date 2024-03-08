from fastapi import FastAPI, staticfiles, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, Response
from dbutil import get_db_connection
import dao
import mqttclient

app = FastAPI()


def main():
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

    client = mqttclient.ClientWrapper()


@app.get("/", response_class=HTMLResponse)
async def root():
    with open("../../Frontend/build/index.html", "r") as f:
        return f.read()


@app.get("/api/node/all")
async def node_all(db=Depends(get_db_connection)):
    return dao.Node.get_all(db)


@app.get("/api/node/{nid}")
async def node_get(nid: int, db=Depends(get_db_connection)):
    return dao.Node.get(nid, db)


@app.get("/api/timestamp/all")
async def timestamp_all(db=Depends(get_db_connection)):
    return dao.TimestampIndex.get_all(db)


@app.get("/api/timestamp/{tid}")
async def timestamp_get(tid: int, db=Depends(get_db_connection)):
    return dao.TimestampIndex.get(tid, db)


@app.get("/api/report/all")
async def report_all(db=Depends(get_db_connection)):
    return dao.ClassifierReport.get_all(db)


@app.get("/api/report/{crid}")
async def report_get(crid: int, db=Depends(get_db_connection)):
    return dao.ClassifierReport.get(crid, db)


@app.get("/api/weather/all")
async def weather_all(db=Depends(get_db_connection)):
    return dao.WeatherData.get_all(db)


@app.get("/api/report/{wdid}")
async def report_get(wdid: int, db=Depends(get_db_connection)):
    return dao.WeatherData.get(wdid, db)


@app.get("/api/audio/all")
async def audio_all(db=Depends(get_db_connection)):
    return dao.AudioFile.get_all(db)


@app.get(path="/api/audio/{afid}", response_class=Response)
async def audio_get(afid: int, db=Depends(get_db_connection)):
    audio_file = dao.AudioFile.get(afid, db)
    data = audio_file.data

    return Response(content=data, media_type="audio/mpeg")

main()
