#include "bmeSensor.h"

BME280Sensor::BME280Sensor(int SDA, int SCL)
{
	Serial.begin(9600);
	this->I2CBME.begin(SDA, SCL, 100000);
	// 0x77 is address for i2c for sensor dont change
	bool status = bme.begin(0x77, &I2CBME);

	while (!status)
	{
		Serial.println("Couldnt find sensor; check wiring!");
		delay(1000);
	}
};

float BME280Sensor::getTemperature()
{
	return this->bme.readTemperature();
}

float BME280Sensor::getPressure()
{
	return this->bme.readPressure();
}

float BME280Sensor::getHumidity()
{
	return this->bme.readHumidity();
}
