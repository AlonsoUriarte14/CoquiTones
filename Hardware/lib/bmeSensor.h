
#ifndef bmeSensor
#define bmeSensor

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define I2C_SDA 33
#define I2C_SCL 32

#define SEALEVELPRESSURE_HPA (1013.25)

unsigned long delayTime;

class BME280Sensor
{

public:
    BME280Sensor(int SDA, int SCL);

    void printAllValues();
    float getTemperature();
    float getPressure();
    float getHumidity();

private:
    TwoWire I2CBME = TwoWire(0);
    Adafruit_BME280 bme;
}

#endif