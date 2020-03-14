/// @description Insert description here
// You can write your code in this editor
instance_create_depth(mouse_x, mouse_y, 0, oClick);
scr_network_send_clicked_screen(socket, mouse_x, mouse_y);