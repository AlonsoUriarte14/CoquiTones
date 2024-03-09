#pragma once

#include "I2SSampler.h"
#include <hal/adc_types.h>
#include <driver/adc.h>
#include <driver/i2s.h>
class ADCSampler : public I2SSampler
{
private:
    adc_unit_t m_adcUnit;
    adc1_channel_t m_adcChannel;
    adc_digi_init_config_s &adc_config;

protected:
    void configureI2S();
    void unConfigureI2S();

public:
    ADCSampler(adc_unit_t adc_unit, adc1_channel_t adc_channel, const adc_digi_init_config_s &adc_sampler_config);
    virtual int read(int16_t *samples, int count);
};
