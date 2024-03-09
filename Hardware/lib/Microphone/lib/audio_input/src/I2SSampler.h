#pragma once

#include <freertos/FreeRTOS.h>
#include <driver/i2s.h>

/**
 * Base Class for both the ADC and I2S sampler
 **/
class I2SSampler
{
protected:
    i2s_port_t m_i2sPort = I2S_NUM_0;
    adc_digi_init_config_s &adc_sampler_config;
    virtual void configureI2S() = 0;
    virtual void unConfigureI2S(){};
    virtual void processI2SData(void *samples, size_t count){
        // nothing to do for the default case
    };

public:
    I2SSampler(i2s_port_t i2sPort, adc_digi_init_config_s &adc_sampler_config);
    void start();
    virtual int read(int16_t *samples, int count) = 0;
    void stop();
};
