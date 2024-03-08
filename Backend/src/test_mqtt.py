import unittest
import mqttclient
import time


class TestMQTTClient(unittest.TestCase):
    def test_ping(self):
        subscriber = mqttclient.ClientWrapper(
            ["coquitones/test/ping"], username="TestSubscriber", password="12345678")
        publisher = mqttclient.ClientWrapper(
            [], username="TestPublisher", password="12345678")
        subscriber.start()
        publisher.start()

        subscriber.subscribe_test()
        time.sleep(5)
        publisher.publish_test()
        time.sleep(1)

        sub_data = subscriber.client.user_data_get()
        self.assertIn(b'ping', sub_data)

        subscriber.stop()
        publisher.stop()


if __name__ == '__main__':
    unittest.main()
