import paho.mqtt.client as mqtt
import paho.mqtt.enums as mqttenums
import json

config = "mqttclientconfig.json"


def on_subscribe(client, userdata, mid, reason_code_list, properties):
    # Since we subscribed only for a single channel, reason_code_list contains
    # a single entry
    if reason_code_list[0].is_failure:
        print(f"Broker rejected you subscription: {reason_code_list[0]}")
    else:
        print(f"Broker granted the following QoS: {reason_code_list[0].value}")


def on_unsubscribe(client, userdata, mid, reason_code_list, properties):
    # Be careful, the reason_code_list is only present in MQTTv5.
    # In MQTTv3 it will always be empty
    if len(reason_code_list) == 0 or not reason_code_list[0].is_failure:
        print("unsubscribe succeeded (if SUBACK is received in MQTTv3 it success)")
    else:
        print(f"Broker replied with failure: {reason_code_list[0]}")
    client.disconnect()


def message_callback_gen(topics):
    def on_message(client, userdata, message):
        # userdata is the structure we choose to provide, here it's a list()
        userdata.append(message.payload)
        # We only want to process 10 messages
        print("Userdata:", userdata)
        print("Message:", message.payload)
    return on_message


def connect_callback_gen(topics):
    def on_connect(client, userdata, flags, reason_code, properties):
        if reason_code.is_failure:
            print(
                f"Failed to connect: {reason_code}. loop_forever() will retry connection")
        else:
            print("Connection succcessful")
            # we should always subscribe from on_connect callback to be sure
            # our subscribed is persisted across reconnections.
            for topic in topics:
                client.subscribe(topic)
    return on_connect


class ClientWrapper:
    def __init__(self, subscribe_topics: list, username: str | None = None, password: str | None = None):
        self.client = mqtt.Client(mqttenums.CallbackAPIVersion.VERSION2)
        self.client.on_connect = connect_callback_gen(subscribe_topics)
        self.client.on_subscribe = on_subscribe
        self.client.on_unsubscribe = on_unsubscribe
        self.client.on_message = message_callback_gen(subscribe_topics)

        # self.client.tls_set(tls_version=mqtt.ssl.PROTOCOL_TLS)

        if username == None or password == None:
            cfg = get_config()
            client_name = cfg["name"]
            client_password = cfg["password"]
        else:
            client_name = username
            client_password = password
        self.client.username_pw_set(client_name, client_password)

        self.client.connect("broker.hivemq.com", 1883)

    def start(self):
        self.client.loop_start()

    def stop(self):
        self.client.loop_stop()

    def subscribe_test(self):
        self.client.subscribe("coquitones/test/ping")

    def publish_test(self):
        self.client.publish("coquitones/test/ping", "ping", 1)


def get_config():
    """Returns dictionary with 'name' and 'password' key value pairs."""
    with open(config, "r") as f:
        return json.load(f)
