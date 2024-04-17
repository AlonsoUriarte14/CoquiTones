#ifndef MQTT
#define MQTT

#include <BotleticsSIM7000.h>
#include <HardwareSerial.h>

/************************* MQTT PARAMETERS *********************************/
#define MQTT_SERVER "broker.hivemq.com"
#define MQTT_PORT 1883
#define MQTT_USERNAME "MQTT_USERNAME"
#define MQTT_PASSWORD "HEQIWRmsaer$1235$"

// Set topic names to publish and subscribe to
#define GPS_TOPIC "location"
#define WEATHER_TOPIC "weather"
#define AUDIO_TOPIC "audio"
#define SUB_TOPIC "command" // Subscribe topic name

HardwareSerial modemSS(1);

class LTE_Wrapper
{
public:
    LTE_Wrapper();

    Botletics_modem_LTE modem = Botletics_modem_LTE();
    
private:
    uint8_t counter = 0;
    unsigned long timer = 0;
    bool firstTime = true;
    uint8_t type;
    float latitude, longitude, speed_kph, heading, altitude, second;
    uint8_t month, day, hour, minute;
    uint16_t year;
    char imei[16] = {0}; // Use this for device ID
};
#endif