// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use std::path::PathBuf;

use serde::{Deserialize, Serialize};
use tauri::{Manager, Wry};
use tauri_plugin_store::{StoreCollection, with_store};

use crate::kafka::service::TopicsData;

mod kafka;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![greet, get_topics, get_kafka_connections_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}


#[derive(Serialize, Deserialize, Debug)]
pub struct TauriResponse<T> {
    data: Option<T>,
    error: Option<String>,
}

#[tauri::command]
fn get_topics(brokers: &str) -> TauriResponse<Vec<TopicsData>> {
    match kafka::service::KafkaService::new(brokers).get_topics() {
        Ok(topics) => TauriResponse { data: Some(topics), error: None },
        Err(e) => TauriResponse { data: None, error: Some(e.to_string()) }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct KafkaBootstrapServer {
    host: String,
    port: usize,
}

#[derive(Serialize, Deserialize, Debug)]
struct KafkaConnection {
    id: String,
    name: String,
    servers: Vec<KafkaBootstrapServer>,
    readonly: bool,
}

#[tauri::command]
fn get_kafka_connections_config(app: tauri::AppHandle) -> TauriResponse<Vec<KafkaConnection>> {
    let stores = app.state::<StoreCollection<Wry>>();
    let path = PathBuf::from(".kafka.settings.dat");
    let mut resp: TauriResponse<Vec<KafkaConnection>> = TauriResponse { data: None, error: None };
    with_store(app.app_handle(), stores, path, |store| {
        let value = store.get("connections").unwrap();
        println!("value: {:?}", value);
        let data: Vec<KafkaConnection> = serde_json::from_str(value.to_string().as_str()).unwrap();
        resp = TauriResponse { data: Some(data), error: None };
        Ok(())
    }).unwrap();
    resp
}

