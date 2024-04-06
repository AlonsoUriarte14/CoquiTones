from fastapi import FastAPI, File, UploadFile, staticfiles, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, Response
from src.dbutil import get_db_connection
from src.Spectrogram import sendMelSpectrogram, sendBasicSpectrogram
import psycopg2
import src.dao as dao
import os


app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:8080",
    "localhost:8080",
    "http://0.0.0.0:8080",
    os.getenv("WEB_URL") + os.pathsep + os.getenv("PORT"),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/static",
    staticfiles.StaticFiles(directory="/app/build/static"),
    name="static",
)


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
async def weather_get(wdid: int, db=Depends(get_db_connection)):
    return dao.WeatherData.get(wdid, db)


@app.get("/api/audio/all")
async def audio_all(db=Depends(get_db_connection)):
    return dao.AudioFile.get_all(db)


@app.get(path="/api/audio/{afid}", response_class=Response)
async def audio_get(afid: int, db=Depends(get_db_connection)):
    audio_file = dao.AudioFile.get(afid, db)
    data = audio_file.data

    return Response(content=data, media_type="audio/mpeg")


@app.post(path="/api/mel-spectrogram/", response_class=Response)
async def mel_spectrogram_get(file: UploadFile = File(...)):
    specData = sendMelSpectrogram(file.file)
    return specData


@app.post(path="/api/basic-spectrogram/", response_class=Response)
async def basic_spectrogram_get(file: UploadFile = File(...)):
    specData = sendBasicSpectrogram(file.file)
    return specData


@app.get("/", response_class=HTMLResponse)
@app.get("/{path}", response_class=HTMLResponse)
async def root():

    try:
        with open("/app/build/index.html", "r") as f:
            return f.read()
    except Exception as e:
        print(e)
