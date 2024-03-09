
#include "I2SSampler.h"
#include "driver/i2s.h"

I2SSampler::I2SSampler(i2s_port_t i2sPort, adc_digi_init_config_s &adc_sampler_config) : m_i2sPort(i2sPort), m_adec(adc_sampler_config)
{
}

void I2SSampler::start()
{
    //install and start i2s driver
    i2s_driver_install(m_i2sPort, &adc_sampler_config, 0, NULL);
    // set up the I2S configuration from the subclass
    configureI2S();
}

void I2SSampler::stop()
{
    // clear any I2S configuration
    unConfigureI2S();
    // stop the i2S driver
    i2s_driver_uninstall(m_i2sPort);
}
