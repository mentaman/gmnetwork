///@param socket
var buffer = buffer_create(1, buffer_grow, 1);
	buffer_write(buffer, buffer_u8, 10);
network_send_raw(argument0, buffer, buffer_tell(buffer));
buffer_delete(buffer);