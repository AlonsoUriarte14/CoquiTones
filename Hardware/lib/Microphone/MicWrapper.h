#ifndef MicWrapper
#define MicWrapper

#include <SPI.h>
#include <SdFat.h>
#include "sdios.h"
#include <Arduino.h>
#include <stdio.h>
#include "SPIFFS.h"
#include <freertos/FreeRTOS.h>
#include <./lib/audio_input/src/I2SMEMSSampler.h>
#include <./lib/wav_file/src/WAVFileReader.h>
#include <./lib/wav_file/src/WAVFileWriter.h>
#include <./lib/sd_card/src/SDCard.h>
#include <../shared/spiConfig.h>
#include <config.h>

// chip select pin for sd card: might have to change
class Microphone
{
public:
    /**
     * @brief Construct a new Microphone:: Microphone object
     * This object mesures data using MAX4466 elecret microphone
     * record function saves data directly to mounted SD CARD
     *
     * Make sure the config.h file is setup properly using GPIOs
     *
     */
    Microphone();

    /**
     * @brief  Using MAX4466 microphone for 5 minutes to a wav file and store it in wav file
     *
     * @return const char* created filename
     */
    const char *recordToFile(const char *fname);

    /**
     * @brief  Take a single measurement form the microphone which is the smallest posible sample
     * This function is to be used if we decide to transmit the raw data between ducks
     *
     * @return int;
     */
    int takeMeasurement();

    void readFile(const char *fname);

private:
    ~Microphone();
    void setup();
    I2SSampler *input;
    SdFs SD;
};

#endif