#!/bin/sh


cat <<EOF > /usr/share/nginx/html/runtime-env.js
window.__RUNTIME_CONFIG__ = {
API_URL: "$API_URL",
SOCKET_URL: "$SOCKET_URL"
};
EOF


exec "$@"