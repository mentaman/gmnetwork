/// @description Insert description here
// You can write your code in this editor
scr_network_init();
scr_network_connect("127.0.0.1", 3002, scr_network_connected, scr_network_failed_connect);