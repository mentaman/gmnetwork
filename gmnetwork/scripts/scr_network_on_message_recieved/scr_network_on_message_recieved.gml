var map = argument0;
var buffer = map[?"buffer"];
var type = buffer_read(buffer, buffer_u8);
script_execute(global.messages_handlers[?type], type, buffer, map);