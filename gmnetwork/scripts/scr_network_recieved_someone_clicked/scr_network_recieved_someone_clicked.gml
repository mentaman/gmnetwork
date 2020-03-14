var type = argument0;
var buffer = argument1;
var map = argument2;

var _x = buffer_read(buffer, buffer_f32);
var _y = buffer_read(buffer, buffer_f32);

instance_create_depth(_x, _y, 0, oClick);