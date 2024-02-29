
#ifndef bmeSensor
#define bmeSensor

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define SEALEVELPRESSURE_HPA (1013.25)

class WeatherData
{

public:
    /**
     * @brief Construct a new Weather Data object; This object encapsulates both the bme280 sensor and the rain sensor
     *
     *
     * @param bmeSDA:  pin for SDA of bme280 sensor
     * @param bmeSCL: pin for SCL of bme280 sensor
     * @param rainPin: pin for rain sensor
     */
    WeatherData(int bmeSDA, int bmeSCL, int rainPin);

    /**
     * @brief Prints output of all sensor data to serial console at 9600 baud
     *
     */
    void printAllValues();
    float getTemperature();
    float getPressure();
    float getHumidity();
    float getAltitude();
    bool isRaining();
    void sleep();

private:
    TwoWire I2CBME = TwoWire(0);
    Adafruit_BME280 bme;
    int rainPin;

    ~WeatherData();
};

#endif