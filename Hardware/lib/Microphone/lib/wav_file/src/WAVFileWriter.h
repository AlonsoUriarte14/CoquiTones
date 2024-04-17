#pragma once

#include "WAVFile.h"
#include <FS.h>
#include <SdFat.h>
class WAVFileWriter
{
private:
  int m_file_size;

  FsFile *m_fp;
  wav_header_t m_header;

public:
  WAVFileWriter(FsFile *fp, int sample_rate);
  void start();
  void write(int16_t *samples, int count);
  void finish();
};
