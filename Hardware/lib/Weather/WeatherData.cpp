#include "WeatherData.h"

WeatherData::WeatherData(int bmeSDA, int bmeSCL, int rainPin)
{
	this->I2CBME.begin(bmeSDA, bmeSCL, 400000);
	// 0x77 is address for i2c for sensor dont change
	bool status = this->bme.begin(0x77, &this->I2CBME);

	while (!status)
	{
		Serial.println("Couldn't find BME280 sensor; check wiring!");
		delay(1000);
		status = this->bme.begin(0x77, &this->I2CBME);
	}

	this->rainPin = rainPin;
	pinMode(this->rainPin, INPUT);


};

float WeatherData::getTemperature()
{
	//(Celsius * 1.8) + 32 = Farenheit
	return (this->bme.readTemperature() * 1.8) + 32;
}

float WeatherData::getPressure()
{
	return this->bme.readPressure();
}

float WeatherData::getHumidity()
{
	return this->bme.readHumidity();
}

float WeatherData::getAltitude()
{
	return this->bme.readAltitude(SEALEVELPRESSURE_HPA);
}

bool WeatherData::isRaining()
{
	int rain_state = digitalRead(this->rainPin);

	return rain_state == HIGH;
}

void WeatherData::printAllValues()
{
	float temperature = this->bme.readTemperature();
	float humidity = this->bme.readHumidity();
	float Altitude = this->bme.readAltitude(SEALEVELPRESSURE_HPA);
	float pressure = this->bme.readPressure();
	
	bool isRaining = this->isRaining();

	Serial.println("Temperature: " + String(temperature));
	Serial.println("Humidity: " + String(humidity));
	Serial.println("Altitude: " + String(Altitude));
	Serial.println("Pressure: " + String(pressure));
	Serial.println("is Raining: " + String(isRaining));

	
}

void WeatherData::sleep()
{
	//TODO: close all pin connections and deep sleep
}

WeatherData::~WeatherData(){
	delete this;
}
