#include <MQTT.h>

LTE_Wrapper::LTE_Wrapper()
{
    pinMode(RST, OUTPUT);
    digitalWrite(RST, HIGH); // Default state

    modem.powerOn(PWRKEY); // Power on the module
    moduleSetup();         // Establishes first-time serial comm and prints IMEI
    // Set modem to full functionality
    modem.setFunctionality(1); // AT+CFUN=1
    modem.setNetworkSettings(F(APN));
}

bool LTE_Wrapper::setup()
{
    while (!modem.enableGPS(true))
    {
        Serial.println(F("Failed to turn on GPS, retrying..."));
        delay(2000); // Retry every 2s
    }
    Serial.println(F("Turned on GPS!"));

    while (!netStatus())
    {
        Serial.println(F("Failed to connect to cell network, retrying..."));
        delay(2000); // Retry every 2s
    }
    Serial.println(F("Connected to cell network!"));

    // Open wireless connection if not already activated
    if (!modem.wirelessConnStatus())
    {
        while (!modem.openWirelessConnection(true))
        {
            Serial.println(F("Failed to enable connection, retrying..."));
            delay(2000); // Retry every 2s
        }
        Serial.println(F("Enabled data!"));
    }
    else
    {
        Serial.println(F("Data already enabled!"));
    }
}

bool LTE_Wrapper::publish(const char *topic, const char *content)
{
    // If not already connected, connect to MQTT
    if (!modem.MQTT_connectionStatus())
    {
        // Set up MQTT parameters (see MQTT app note for explanation of parameter values)
        modem.MQTT_setParameter("URL", MQTT_SERVER, MQTT_PORT);
        // Set up MQTT username and password if necessary
        modem.MQTT_setParameter("USERNAME", MQTT_USERNAME);
        modem.MQTT_setParameter("PASSWORD", MQTT_PASSWORD);
        //    modem.MQTTsetParameter("KEEPTIME", 30); // Time to connect to server, 60s by default

        Serial.println(F("Connecting to MQTT broker..."));
        if (!modem.MQTT_connect(true))
        {
            Serial.println(F("Failed to connect to broker!"));
        }
    }
    else
    {
        Serial.println(F("Already connected to MQTT server!"));
    }

    if (topic == AUDIO_TOPIC)
    {
        return this->handleAudioPublish(content)
    }
}

bool LTE_Wrapper::netStatus()
{
    int n = modem.getNetworkStatus();

    Serial.print(F("Network status "));
    Serial.print(n);
    Serial.print(F(": "));
    if (n == 0)
        Serial.println(F("Not registered"));
    if (n == 1)
        Serial.println(F("Registered (home)"));
    if (n == 2)
        Serial.println(F("Not registered (searching)"));
    if (n == 3)
        Serial.println(F("Denied"));
    if (n == 4)
        Serial.println(F("Unknown"));
    if (n == 5)
        Serial.println(F("Registered roaming"));

    if (!(n == 1 || n == 5))
        return false;
    else
        return true;
}

void LTE_Wrapper::moduleSetup()
{
    // SIM7000 takes about 3s to turn on and SIM7500 takes about 15s
    // Press Arduino reset button if the module is still turning on and the board doesn't find it.
    // When the module is on it should communicate right after pressing reset

    // Software serial:
    modemSS.begin(115200); // Default SIM7000 shield baud rate

    Serial.println(F("Configuring to 9600 baud"));
    modemSS.println("AT+IPR=9600"); // Set baud rate
    delay(100);                     // Short pause to let the command run
    modemSS.begin(9600);
    if (!modem.begin(modemSS))
    {
        Serial.println(F("Couldn't find modem"));
        while (1)
            ; // Don't proceed if it couldn't find the device
    }

    // Hardware serial:
    /*
    modemSerial->begin(115200); // Default SIM7000 baud rate

    if (! modem.begin(*modemSerial)) {
      DEBUG_PRINTLN(F("Couldn't find SIM7000"));
    }
    */

    // The commented block of code below is an alternative that will find the module at 115200
    // Then switch it to 9600 without having to wait for the module to turn on and manually
    // press the reset button in order to establish communication. However, once the baud is set
    // this method will be much slower.
    /*
    modemSerial->begin(115200); // Default LTE shield baud rate
    modem.begin(*modemSerial); // Don't use if statement because an OK reply could be sent incorrectly at 115200 baud

    Serial.println(F("Configuring to 9600 baud"));
    modem.setBaudrate(9600); // Set to 9600 baud
    modemSerial->begin(9600);
    if (!modem.begin(*modemSerial)) {
      Serial.println(F("Couldn't find modem"));
      while(1); // Don't proceed if it couldn't find the device
    }
    */

    type = modem.type();
    Serial.println(F("Modem is OK"));
    Serial.print(F("Found "));
    switch (type)
    {
    case SIM800L:
        Serial.println(F("SIM800L"));
        break;
    case SIM800H:
        Serial.println(F("SIM800H"));
        break;
    case SIM808_V1:
        Serial.println(F("SIM808 (v1)"));
        break;
    case SIM808_V2:
        Serial.println(F("SIM808 (v2)"));
        break;
    case SIM5320A:
        Serial.println(F("SIM5320A (American)"));
        break;
    case SIM5320E:
        Serial.println(F("SIM5320E (European)"));
        break;
    case SIM7000:
        Serial.println(F("SIM7000"));
        break;
    case SIM7070:
        Serial.println(F("SIM7070"));
        break;
    case SIM7500:
        Serial.println(F("SIM7500"));
        break;
    case SIM7600:
        Serial.println(F("SIM7600"));
        break;
    default:
        Serial.println(F("???"));
        break;
    }
}