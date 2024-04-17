#include "esp_log.h"
#include "WAVFileReader.h"

static const char *TAG = "WAV";

WAVFileReader::WAVFileReader(FsFile *file) // Change the constructor parameter to FsFile*
{
    m_fp = file; // Change m_fp to m_file
    // read the WAV header
    m_fp->read((uint8_t *)&m_wav_header, sizeof(wav_header_t)); // Use FsFile's read method instead of fread
    // sanity check the bit depth
    if (m_wav_header.bit_depth != 16)
    {
        ESP_LOGE(TAG, "ERROR: bit depth %d is not supported\n", m_wav_header.bit_depth);
    }
    if (m_wav_header.num_channels != 1)
    {
        ESP_LOGE(TAG, "ERROR: channels %d is not supported\n", m_wav_header.num_channels);
    }
    ESP_LOGI(TAG, "fmt_chunk_size=%d, audio_format=%d, num_channels=%d, sample_rate=%d, sample_alignment=%d, bit_depth=%d, data_bytes=%d\n",
             m_wav_header.fmt_chunk_size, m_wav_header.audio_format, m_wav_header.num_channels, m_wav_header.sample_rate, m_wav_header.sample_alignment, m_wav_header.bit_depth, m_wav_header.data_bytes);
}

int WAVFileReader::read(int16_t *samples, int count)
{
    size_t read = m_fp->read((uint8_t *)samples, sizeof(int16_t) * count); // Use FsFile's read method instead of fread
    return read / sizeof(int16_t);                                         // Return the number of samples read, not the number of bytes
}
