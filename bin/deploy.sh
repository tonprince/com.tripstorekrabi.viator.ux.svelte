#!/bin/sh
cd ..
npm run build

gcloud app deploy --version=1 --project=viator-done-right --quiet