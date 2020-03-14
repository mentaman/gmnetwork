///@param socket
///@param message
var buffer = buffer_create(1, buffer_grow, 1);
	//type
	buffer_write(buffer, buffer_u8, network_send_message);
	//message
	buffer_write(buffer, buffer_string, argument1);
network_send_raw(argument0, buffer, buffer_tell(buffer));
buffer_delete(buffer);