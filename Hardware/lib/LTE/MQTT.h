#ifndef MQTT
#define MQTT

#include <BotleticsSIM7000.h>
#include <HardwareSerial.h>
#include <SdFat.h>
/************************* MQTT PARAMETERS *********************************/
#define MQTT_SERVER "broker.hivemq.com"
#define MQTT_PORT 1883
#define MQTT_USERNAME "PAPADUCK"
#define MQTT_PASSWORD "HEQIWRmsaer$1235$"

// Set topic names to publish and subscribe to
#define GPS_TOPIC "location"
#define WEATHER_TOPIC "weather"
#define AUDIO_TOPIC "audio"

// For botletics SIM70X0 shield
#define PWRKEY 6
#define RST 7
// #define DTR 8 // Connect with solder jumper
// #define RI 9 // Need to enable via AT commands
#define TX 10 // Microcontroller RX
#define RX 11 // Microcontroller TX
#define APN "fast.t-mobile.com"
HardwareSerial modemSS(1);

class LTE_Wrapper
{
public:
    LTE_Wrapper();
    bool publish(const char *topic, const char *content);
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

    bool handleAudioPublish(const char *filename);
    bool netStatus();
    void moduleSetup();
};
#endif