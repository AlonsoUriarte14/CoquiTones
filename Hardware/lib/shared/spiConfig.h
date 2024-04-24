

class MySpiClass : public SdSpiBaseClass
{
public:
    // Activate SPI hardware with correct speed and mode.
    void activate() { SPI.beginTransaction(m_spiSettings); }
    // Initialize the SPI bus.
    void begin(SdSpiConfig config)
    {
        (void)config;
        SPI.begin(PIN_NUM_CLK, PIN_NUM_MISO, PIN_NUM_MOSI, -1);
    }
    // Deactivate SPI hardware.
    void deactivate() { SPI.endTransaction(); }
    // Receive a byte.
    uint8_t receive() { return SPI.transfer(0XFF); }
    // Receive multiple bytes.
    // Replace this function if your board has multiple byte receive.
    uint8_t receive(uint8_t *buf, size_t count)
    {
        for (size_t i = 0; i < count; i++)
        {
            buf[i] = SPI.transfer(0XFF);
        }
        return 0;
    }
    // Send a byte.
    void send(uint8_t data) { SPI.transfer(data); }
    // Send multiple bytes.
    // Replace this function if your board has multiple byte send.
    void send(const uint8_t *buf, size_t count)
    {
        for (size_t i = 0; i < count; i++)
        {
            SPI.transfer(buf[i]);
        }
    }
    // Save SPISettings for new max SCK frequency
    void setSckSpeed(uint32_t maxSck)
    {
        m_spiSettings = SPISettings(maxSck, MSBFIRST, SPI_MODE0);
    }

private:
    SPISettings m_spiSettings;
} mySpi;

#if ENABLE_DEDICATED_SPI
#define SD_CONFIG SdSpiConfig(PIN_NUM_CS, DEDICATED_SPI, SD_SCK_MHZ(50), &mySpi)
#else // ENABLE_DEDICATED_SPI
#define SD_CONFIG SdSpiConfig(SD_CS_PIN, SHARED_SPI, SD_SCK_MHZ(50), &mySpi)
#endif // ENABLE_DEDICATED_SPI
