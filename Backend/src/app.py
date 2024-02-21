from fastapi import FastAPI, staticfiles
from fastapi.responses import HTMLResponse

app = FastAPI()

app.mount("/static", staticfiles.StaticFiles(directory="../../Frontend/build/static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def root():
    with open("../../Frontend/build/index.html", "r") as f:
        return f.read()
    
