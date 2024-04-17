#include <MicWrapper.h>

class MySpiClass : public SdSpiBaseClass {
 public:
  // Activate SPI hardware with correct speed and mode.
  void activate() { SPI.beginTransaction(m_spiSettings); }
  // Initialize the SPI bus.
  void begin(SdSpiConfig config) {
    (void)config;
    SPI.begin(PIN_NUM_CLK, PIN_NUM_MISO, PIN_NUM_MOSI, -1);
  }
  // Deactivate SPI hardware.
  void deactivate() { SPI.endTransaction(); }
  // Receive a byte.
  uint8_t receive() { return SPI.transfer(0XFF); }
  // Receive multiple bytes.
  // Replace this function if your board has multiple byte receive.
  uint8_t receive(uint8_t* buf, size_t count) {
    for (size_t i = 0; i < count; i++) {
      buf[i] = SPI.transfer(0XFF);
    }
    return 0;
  }
  // Send a byte.
  void send(uint8_t data) { SPI.transfer(data); }
  // Send multiple bytes.
  // Replace this function if your board has multiple byte send.
  void send(const uint8_t* buf, size_t count) {
    for (size_t i = 0; i < count; i++) {
      SPI.transfer(buf[i]);
    }
  }
  // Save SPISettings for new max SCK frequency
  void setSckSpeed(uint32_t maxSck) {
    m_spiSettings = SPISettings(maxSck, MSBFIRST, SPI_MODE0);
  }

 private:
  SPISettings m_spiSettings;
} mySpi;

#if ENABLE_DEDICATED_SPI
#define SD_CONFIG SdSpiConfig(PIN_NUM_CS, DEDICATED_SPI, SD_SCK_MHZ(50), &mySpi)
#else  // ENABLE_DEDICATED_SPI
#define SD_CONFIG SdSpiConfig(SD_CS_PIN, SHARED_SPI, SD_SCK_MHZ(50), &mySpi)
#endif  // ENABLE_DEDICATED_SPI




Microphone::Microphone()
{
    this->setup();
}

void Microphone::setup()
{

    pinMode(PIN_NUM_CS, OUTPUT );
    digitalWrite(PIN_NUM_CS, LOW);

    bool sdBegin = this->SD.cardBegin(SD_CONFIG);
    if (!sdBegin)
    {
        Serial.println("SD card Initializing failed");
        Serial.println("1. is a card inserted?");
        Serial.println("2. is your wiring correct?");
        Serial.println("3. did you change the chipSelect pin to match your shield or module?");
        Serial.println("Note: press reset button on the board and reopen this Serial Monitor after fixing your issue!");

    }

    uint8_t cardType = this->SD.card()->type();
        Serial.print("SD Card Type: ");
        if (cardType == SD_CARD_TYPE_SD1) {
            Serial.println("SD1");
        } else if (cardType == SD_CARD_TYPE_SD2) {
            Serial.println("SD2");
        } else if (cardType == SD_CARD_TYPE_SDHC) {
            Serial.println("SDHC");
        } else {
            Serial.println("Unknown");
        }



    delay(1000);
    Serial.println("SD CARD CREATED!!!");
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
    Serial.println("Start Talking, mf...");
    input->start();
    // open the file on the sdcard

    Serial.print("Writing to ");
    Serial.print(fname);
    FsFile fp = this->SD.open(fname, O_CREAT | O_RDWR);
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

    Serial.print("Finished Recording, mf... ");
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

void Microphone::readFile(const char *fname) {
    FsFile file = this->SD.open(fname);
    
        // Read some of the data back, an null terminate it to make it a valid str
    char read_data[65];
    size_t bytes_read = file.read(read_data, 64);
    read_data[bytes_read] = '\0';

    Serial.print("Read ");
    Serial.print(bytes_read);
    Serial.print(" bytes, which are as follows: \n\n");
    Serial.println(read_data);
}