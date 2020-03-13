var map = argument0;
show_debug_message("recieved message");
show_debug_message(json_encode(map));
var buffer = map[?"buffer"];
var read = buffer_read(buffer, buffer_text);
show_debug_message("message: "+string(read));
scr_network_send_message(map[?"id"], "got you!");