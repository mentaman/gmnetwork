///@param socket
///@param x
///@param y
var buffer = buffer_create(1, buffer_grow, 1);
	//type
	buffer_write(buffer, buffer_u8, network_send_clicked_screen);
	//x
	buffer_write(buffer, buffer_f32, argument1);
	//y
	buffer_write(buffer, buffer_f32, argument2);
network_send_raw(argument0, buffer, buffer_tell(buffer));
buffer_delete(buffer);