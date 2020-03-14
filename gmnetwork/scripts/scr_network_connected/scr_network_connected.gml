var map = argument0;
show_message("fully connected to "+string(map[?"ip"]));
scr_network_wait_for_socket_messages(map[?"id"], scr_network_on_message_recieved);
scr_network_wait_for_disconnection(map[?"id"]);