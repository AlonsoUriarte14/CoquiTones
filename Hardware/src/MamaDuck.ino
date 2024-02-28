/**
 * @file MamaDuck.ino
 * @brief Uses the built in Mama Duck.
 */

#include <string>
#include <arduino-timer.h>
#include <MamaDuck.h>
#include <MemoryFree.h>
#include <../lib/Weather/WeatherData.h>
#include <../lib/Microphone/MicWrapper.h>

#ifdef SERIAL_PORT_USBVIRTUAL
#define Serial SERIAL_PORT_USBVIRTUAL
#endif

// INTEGRATE VTASKS FROM https://github.com/atomic14/esp32_sdcard_audio/tree/main MAIN 

// create a built-in mama duck
MamaDuck duck;

// create a timer with default settings
auto timer = timer_create_default();

// for sending the counter message
const int INTERVAL_MS = 10000; // 10 seconds
int counter = 1;

void setup() {
  // We are using a hardcoded device id here, but it should be retrieved or
  // given during the device provisioning then converted to a byte vector to
  // setup the duck NOTE: The Device ID must be exactly 8 bytes otherwise it
  // will get rejected
  std::string deviceId("MAMA0001");
  std::vector<byte> devId;
  devId.insert(devId.end(), deviceId.begin(), deviceId.end());
  duck.setupWithDefaults(devId);

  // Initialize the timer. The timer thread runs separately from the main loop
  // and will trigger sending a counter message.
  timer.every(INTERVAL_MS, runSensor);
  Serial.println("[MAMA] Setup OK!");

}

void loop() {
  timer.tick();
  // Use the default run(). The Mama duck is designed to also forward data it receives
  // from other ducks, across the network. It has a basic routing mechanism built-in
  // to prevent messages from hoping endlessly.
  duck.run();
}

bool runSensor(void *) {
  bool result;
  const byte* buffer;
  
  WeatherData* data = new WeatherData(41, 42, 10);
  String message = String(data->getHumidity());
  int length = message.length();
  Serial.print("[MAMA] sensor data: ");
  Serial.println(message);
  buffer = (byte*) message.c_str(); 

  result = sendData(buffer, length);
  if (result) {
     Serial.println("[MAMA] runSensor ok.");
  } else {
     Serial.println("[MAMA] runSensor failed.");
  }
  return result;
}

bool sendData(const byte* buffer, int length) {
  bool sentOk = false;
  
  // Send Data can either take a byte buffer (unsigned char) or a vector
  int err = duck.sendData(topics::status, buffer, length);
  if (err == DUCK_ERR_NONE) {
     counter++;
     sentOk = true;
  }
  if (!sentOk) {
    Serial.println("[MAMA] Failed to send data. error = " + String(err));
  }
  return sentOk;
}
