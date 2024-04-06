#include <MicWrapper.h>

Microphone::Microphone()
{
    this->setup();
}

void Microphone::setup()
{
    SPI.begin(PIN_NUM_CLK, PIN_NUM_MISO, PIN_NUM_MOSI, PIN_NUM_CS);
    bool sdBegin = SD.begin(PIN_NUM_CS);
    while (!sdBegin)
    {
        Serial.println("SD card Initializing failed");
        Serial.println("1. is a card inserted?");
        Serial.println("2. is your wiring correct?");
        Serial.println("3. did you change the chipSelect pin to match your shield or module?");
        Serial.println("Note: press reset button on the board and reopen this Serial Monitor after fixing your issue!");

        uint8_t cardType = SD.cardType();

        if(cardType == CARD_NONE){
            Serial.println("No SD card attached");
            return;
        }

        Serial.print("SD Card Type: ");
        if(cardType == CARD_MMC){
            Serial.println("MMC");
        } else if(cardType == CARD_SD){
            Serial.println("SDSC");
        } else if(cardType == CARD_SDHC){
            Serial.println("SDHC");
        } else {
            Serial.println("UNKNOWN");
        }
        delay(1000);
        sdBegin = SD.begin(PIN_NUM_CS);
    }

    ESP_LOGI(TAG, "Creating microphone");
#ifdef USE_I2S_MIC_INPUT
    this->input = new I2SMEMSSampler(I2S_NUM_0, i2s_mic_pins, i2s_mic_Config);
#else
    this->input = new ADCSampler(ADC_UNIT_1, ADC1_CHANNEL_7, i2s_adc_config);
#endif
}

const char *Microphone::recordToFile(const char *fname)
{

    int16_t *samples = (int16_t *)malloc(sizeof(int16_t) * 1024);
    ESP_LOGI(TAG, "Start talking, mf...");
    input->start();
    // open the file on the sdcard

    File fp = SD.open(fname, FILE_WRITE);
    // create a new wave file writer
    WAVFileWriter *writer = new WAVFileWriter(&fp, input->sample_rate());

    unsigned long start_time;
    unsigned long current_time;
    unsigned long elapsed_time;

    int recordTime = AUDIO_DURATION * 1000; // this is 5 minutes in ms
    start_time = millis();
    do
    {

        int samples_read = input->read(samples, 1024);
        int64_t start = esp_timer_get_time();
        writer->write(samples, samples_read);
        int64_t end = esp_timer_get_time();
        ESP_LOGI(TAG, "Wrote %d samples in %lld microseconds", samples_read, end - start);

        current_time = millis();
        elapsed_time = current_time - start_time;
    } while (elapsed_time < recordTime);

    // stop the input
    input->stop();
    // and finish the writing
    writer->finish();
    fp.close();
    delete writer;
    free(samples);

    return fname;
}

int Microphone::takeMeasurement()
{
    int16_t *samples = (int16_t *)malloc(sizeof(int16_t) * 1024);

    input->start();
    int samples_read = input->read(samples, 1024);
    int64_t start = esp_timer_get_time();
    int64_t end = esp_timer_get_time();
    ESP_LOGI(TAG, "Wrote %d samples in %lld microseconds", samples_read, end - start);

    return samples_read;
}
