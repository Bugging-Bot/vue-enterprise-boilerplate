# Identity providers setup steps

# port range should be within 0 to 65535

# get free ports in windows 11 to netstat -ano

# checking if the port is available: `Test-NetConnection -ComputerName localhost -Port 53551` if it's avilable it will return false

## Keycloak

### refrence : https://www.keycloak.org/getting-started/getting-started-podman

1. podman run -p 127.0.0.1:53551:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.4.0 start-dev
2. Added new relam, group, user and accessable via : http://127.0.0.1:53551/realms/GherKaPata/account/
3. setting for VueJS. npm install @josempgon/vue-keycloak keycloak-js
