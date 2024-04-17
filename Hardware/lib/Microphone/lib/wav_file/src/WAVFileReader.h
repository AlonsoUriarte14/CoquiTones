#pragma once

#include "WAVFile.h"
#include <stdio.h>

class WAVFileReader
{
private:
    wav_header_t m_wav_header;

    FsFile *m_fp;

public:
    WAVFileReader(FsFile *fp);
    int sample_rate() { return m_wav_header.sample_rate; }
    int read(int16_t *samples, int count);
};
