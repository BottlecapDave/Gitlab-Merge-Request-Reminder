del tag.txt
git describe --tag > tag.txt
set /p TAG=<tag.txt
echo %TAG%

cd ../../
docker build -t bottlecapdave/gitlab-merge-request-reminder:%TAG% .
docker push bottlecapdave/gitlab-merge-request-reminder:%TAG%
docker push bottlecapdave/gitlab-merge-request-reminder:latest

cd _build/scripts
del tag.txt