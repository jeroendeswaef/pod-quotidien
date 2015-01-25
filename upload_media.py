# !/usr/bin/python3

import boto
import requests
import tempfile

from boto.s3.key import Key

conn = boto.s3.connect_to_region('eu-central-1',
    aws_access_key_id='[redacted_access_key]',
    aws_secret_access_key='[redacted_secret]')

bucket = conn.lookup('[redacted_bucket]', validate=False)

chunk_size = 1024

r = requests.get('[redacted_url]')
fileTemp = tempfile.NamedTemporaryFile(delete = True)
for chunk in r.iter_content(chunk_size):
    fileTemp.write(chunk)
fileTemp.seek(0)

k = Key(bucket)
k.key = '/media/rfi/foobar'
k.set_contents_from_file(fileTemp)
fileTemp.close()
