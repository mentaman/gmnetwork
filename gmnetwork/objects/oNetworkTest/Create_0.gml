/// @description Insert description here
// You can write your code in this editor
scr_network_init();
socket = scr_network_connect("35.185.252.155", 3002, scr_network_connected, scr_network_failed_connect);