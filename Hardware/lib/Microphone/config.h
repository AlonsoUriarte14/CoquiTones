#pragma once

#include <freertos/FreeRTOS.h>
#include <driver/i2s.h>
#include <hal/gpio_types.h>
#include <hal/i2s_types.h>

// sample rate for the system
#define SAMPLE_RATE 44000 // HZ
#define AUDIO_DURATION 10 // SECONDS

// save to SPIFFS instead of SD Card?
// #define USE_SPIFFS 1

// are you using an I2S microphone - comment this out if you want to use an analog mic and ADC input
#define USE_I2S_MIC_INPUT
// are you using an I2S amplifier - comment this out if you want to use the built in DAC
#define USE_I2S_SPEAKER_OUTPUT

// I2S Microphone Settings
// Which channel is the I2S microphone on? I2S_CHANNEL_FMT_ONLY_LEFT or I2S_CHANNEL_FMT_ONLY_RIGHT
// Generally they will default to LEFT - but you may need to attach the L/R pin to GND
#define I2S_MIC_CHANNEL I2S_CHANNEL_FMT_ONLY_LEFT
// #define I2S_MIC_CHANNEL I2S_CHANNEL_FMT_ONLY_RIGHT

// sck pin
#define I2S_MIC_SERIAL_CLOCK GPIO_NUM_26
// world select (ws pin)
#define I2S_MIC_LEFT_RIGHT_CLOCK GPIO_NUM_20
// sd pin
#define I2S_MIC_SERIAL_DATA GPIO_NUM_21

// Analog Microphone Settings - ADC1_CHANNEL_7 is GPIO35
#define ADC_MIC_CHANNEL ADC1_CHANNEL_7

#define PIN_NUM_CS GPIO_NUM_36
#define PIN_NUM_CLK GPIO_NUM_5
#define PIN_NUM_MOSI GPIO_NUM_34
#define PIN_NUM_MISO GPIO_NUM_19

// i2s config for using the internal ADC
extern i2s_config_t i2s_adc_config;
// i2s config for reading from of I2S
extern i2s_config_t i2s_mic_Config;
// i2s microphone pins
extern i2s_pin_config_t i2s_mic_pins;
// i2s speaker pins
extern i2s_pin_config_t i2s_speaker_pins;
