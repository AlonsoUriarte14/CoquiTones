
#ifndef bmeSensor
#define bmeSensor

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define SEALEVELPRESSURE_HPA (1013.25)

class WeatherData
{

public:
    WeatherData(int bmeSDA, int bmeSCL, int rainPin);
    ~WeatherData();
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
};

#endif