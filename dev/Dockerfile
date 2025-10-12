FROM nginx:stable-alpine3.21

COPY nginx/nginx.conf /etc/nginx/nginx.conf

# not copying oauth2.conf, since oauth2 won't work behind a reverse proxy.