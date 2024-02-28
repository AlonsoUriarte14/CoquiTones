#ifndef MicWrapper
#define MicWrapper

#include <SPI.h>
#include <SD.h>
#include <Arduino.h>
#include <stdio.h>
#include "SPIFFS.h"
#include <freertos/FreeRTOS.h>
#include <./lib/audio_input/src/ADCSampler.h>
#include <./lib/sd_card/src/SDCard.h>
#include <./lib/wav_file/src/WAVFileReader.h>
#include <./lib/wav_file/src/WAVFileWriter.h>
#include <config.h>
class Microphone {
    public:
        Microphone();
        void record();
        
    private:
        ~Microphone();
        void setup();
        I2SSampler *input;
        
};

#endif