use std::time::Duration;

use rdkafka::config::ClientConfig;
use rdkafka::consumer::{BaseConsumer, Consumer};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct TopicsData {
    pub name: String,
    pub partitions_count: usize,
    pub messages_count: usize,
}

pub struct KafkaService {
    consumer: BaseConsumer,
}

impl KafkaService {
    pub fn new(brokers: &str) -> KafkaService {
        let consumer = ClientConfig::new()
            .set("bootstrap.servers", brokers)
            .create()
            .expect("Consumer creation failed");
        KafkaService { consumer }
    }

    pub fn get_topics(&mut self) -> Vec<TopicsData> {
        let metadata = self.consumer.fetch_metadata(None, Duration::from_secs(5)).unwrap();
        let mut topics: Vec<TopicsData> = Vec::new();

        for topic in metadata.topics() {
            let mut partitions_count = topic.partitions().len();
            let mut messages_count: usize = 0;
            for partition in topic.partitions() {
                match self.consumer.fetch_watermarks(topic.name(), partition.id(), Duration::from_secs(5)) {
                    Ok((low, high)) => {
                        messages_count += (high - low) as usize;
                    }
                    Err(e) => println!("Error fetching watermarks for partition {}: {}", partition.id(), e),
                }
            }
            topics.push(TopicsData{name: topic.name().to_string(), partitions_count, messages_count});
        }
        topics
    }
}
