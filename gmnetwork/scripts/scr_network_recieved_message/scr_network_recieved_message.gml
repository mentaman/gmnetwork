var type = argument0;
var buffer = argument1;
var map = argument2;
var read = buffer_read(buffer, buffer_text);
show_debug_message("some message");
show_debug_message("message: "+string(read));
scr_network_send_text_message(map[?"id"], "got you!");