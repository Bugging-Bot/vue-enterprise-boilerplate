# this folder contain code related to NATS and Server-Sent Events (SSE)

## starting NATS server

1. Aurdino writting directly to NATS server: https://github.com/isobit/arduino-nats
2. NodeJS client for NATS: https://github.com/nats-io/nats.js

## Steps for startig NATS server

1. command: `nats-server -c nats-config.conf`

# In my configuration, JetStream is enabled for the vendor_a and vendor_b accounts. However, but need to create a stream within JetStream for publishing and subscribing to messages.

2. Define the context: command: `nats context add vendor_a_context --server nats://localhost:4222 --user vendor_a_user --password "V3nd0r_A_P@ss"`
3. Set the context: command: `nats context set vendor_a_context`

# this is normal pub-sub example

4. publisher: command: `nats pub mystream.foo "Hello JetStream!"`
5. subscriber: command: `nats sub mystream.foo`
   `nats sub --user sys_user --password Sys_P@ss f.1.p.1.m.17.s.1.a`

# this is for JetStream

4. add stream: command: `nats stream add mystream --subjects "mystream.*" --storage file --max-age 24h`
5. publisher: command: `nats pub mystream.foo "Hello JetStream!"`
6. create consumer: command: `nats consumer add mystream myconsumer --filter "mystream.*" --ack`
7. create subscriber to consumer: command: `nats sub "mystream.foo" --ack`

# Create a Stream "mysteam", This will create a stream called mystream that can store messages under subjects like mystream.foo or mystream.bar.

1. nats context set vendor_a --user vendor_a_user --password V3nd0r_A_P@ss
2. nats stream add mystream --subjects "mystream.\*" --storage file --max-age 24h

## step of creating publisher and subscriber

1. publisher: `nats-pub -s nats://localhost:4222 test 1234`
2. subscriber: `nats-sub -s nats://localhost:4222 test`

# package used for nats is

1. https://www.npmjs.com/package/nats
