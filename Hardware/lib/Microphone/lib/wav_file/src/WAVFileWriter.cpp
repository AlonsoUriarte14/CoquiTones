#include "WAVFileWriter.h"

static const char *TAG = "WAV";

WAVFileWriter::WAVFileWriter(FsFile *fp, int sample_rate)
{
  m_fp = fp;
  m_header.sample_rate = sample_rate;
  // write out the header - we'll fill in some of the blanks later
  m_fp->write((uint8_t *)&m_header, sizeof(m_header));
  m_file_size = sizeof(wav_header_t);
}

void WAVFileWriter::write(int16_t *samples, int count)
{
  // write the samples and keep track of the file size so far
  uint8_t *sampleBytes = (uint8_t *)samples;
  m_fp->write(sampleBytes, sizeof(int16_t) * count);
  m_file_size += sizeof(int16_t) * count;
}
void WAVFileWriter::finish()
{
  // now fill in the header with the correct information and write it again
  m_header.data_bytes = m_file_size - sizeof(wav_header_t);
  m_header.wav_size = m_file_size - 8;
  m_fp->seek(0);
  m_fp->write((uint8_t *)&m_header, sizeof(m_header));
}