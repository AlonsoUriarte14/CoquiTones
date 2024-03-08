import unittest
import mqttclient


class TestMQTTClient(unittest.TestCase):
    def test_ping(self):
        print("hi")
        subscriber = mqttclient.ClientWrapper(
            ["coquitones/test/ping"], username="TestSubscriber", password="12345678")
        publisher = mqttclient.ClientWrapper(
            [], username="TestPublisher", password="12345678")
        subscriber.start()
        publisher.start()

        subscriber.subscribe_test()
        publisher.publish_test()

        sub_data = subscriber.client.user_data_get()

        subscriber.stop()
        publisher.stop()


if __name__ == '__main__':
    unittest.main()
