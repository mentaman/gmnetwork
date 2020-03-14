instance_create_depth(0, 0, 0, oNetwork);

global.messages_handlers = ds_map_create();

//from server messages:
#macro network_rec_connected 0
#macro network_rec_message 1
#macro network_rec_someone_clicked 2

//to server messages:
#macro network_send_message 0
#macro network_send_clicked_screen 1

global.messages_handlers[?network_rec_connected] = scr_network_recieved_connected;
global.messages_handlers[?network_rec_message] = scr_network_recieved_message;
global.messages_handlers[?network_rec_someone_clicked] = scr_network_recieved_someone_clicked;